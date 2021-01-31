#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

mod utils;

use rocket::State;

use serde::Deserialize;

use serde::Serialize;

use rocket_contrib::json::Json;

use rocket_contrib::json::JsonValue;

use rocket::http::Method;

use rocket_cors:: {
    AllowedOrigins,
    Cors,
    CorsOptions,
    AllowedHeaders
};

use std::string::String;

use std::sync::RwLock;

type ResortsState = RwLock<Vec<Resort>>;
type UsersState = RwLock<Vec<User>>;

#[derive(Serialize, Deserialize)]
struct User {
    #[serde(default)]
    id: String,
    first_name: String,
    last_name: String,
    email: String,
    resort: String
}

#[derive(Serialize, Deserialize)]
struct Resort {
    #[serde(default)]
    id: String,
    name: String,
    description: String
}

impl Resort {
    pub fn new(name: String, description: String, id: Option<String>) -> Self {
        let mut current_id = String::from("");
        if id != None {
            current_id = id.unwrap();
        }
        Resort {
            id: current_id,
            name: name,
            description: description
        }
    }
}

impl User {
    pub fn new(id: String, first_name: String, last_name: String, email: String, resort: String) -> Self {
        User {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            resort: resort
        }
    }
}

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000"
    ]);

    CorsOptions {
        allowed_origins,
        allow_credentials: true,
        allowed_headers: AllowedHeaders::All,
        allowed_methods: vec![Method::Get, Method::Post, Method::Delete, Method::Patch].into_iter().map(From::from).collect(),
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}

#[get("/")]
fn index() -> JsonValue {
    json!({
        "message": "Welcome to the Resorts API",
        "status": "ok"
    })
}

#[post("/users", data = "<user>")]
fn add_user(user: Json<User>, users_state: State<UsersState>, resorts_state: State<ResortsState>) -> JsonValue {
    let id = utils::get_id();

    let mut resorts = resorts_state.write().unwrap();

    let mut resort_id = user.0.resort;

    let option_result = resorts.iter().position(|i| i.id == resort_id);

    // if the resort is not found we consider that is the name of the resort
    if option_result == None {
        let mut new_resort = Resort::new(resort_id, String::from(""), None);

        resort_id = utils::get_id();

        new_resort.id = resort_id.clone();

        resorts.push(new_resort);
    }

    let new_user = User::new(
        id.clone(),
        user.0.first_name,
        user.0.last_name,
        user.0.email,
        resort_id
    );

    let mut users = users_state.write().unwrap();

    users.push(new_user);

    json!({
        "created": true
    })
}

#[get("/users")]
fn get_users(users_state: State<UsersState>, reports_state: State<ResortsState>) -> JsonValue {
    let resorts_data = reports_state.read().unwrap();
    let resorts: Vec<&Resort> = resorts_data.iter().collect::<Vec<&Resort>>();
    let users_data = users_state.read().unwrap();
    let mut users: Vec<User> = Vec::new();
    for u in users_data.iter() {
        let resort = resorts.iter().find(|r| r.id == u.resort).unwrap();
        users.push(
            User::new(
                u.id.clone(),
                u.first_name.clone(),
                u.last_name.clone(),
                u.email.clone(),
                resort.name.clone()
            )
        )
    }
    json!(users)
}

#[get("/resorts")]
fn get_resorts_list(state: State<ResortsState>) -> JsonValue {
    let data = state.read().unwrap();
    let resorts: Vec<&Resort> = data.iter().collect::<Vec<&Resort>>();
    json!(resorts)
}

#[post("/resorts", data = "<resort>")]
fn add_resort(resort: Json<Resort>, state: State<ResortsState>) -> JsonValue {
    let id = utils::get_id();

    let mut new_resort = Resort::new(resort.0.name, resort.0.description, None);

    new_resort.id = id;

    let mut resorts = state.write().unwrap();

    resorts.push(new_resort);

    json!({
        "created": true
    })
}

#[patch("/resorts/<id>", data = "<resort>")]
fn update_resort(id: String, resort: Json<Resort>, state: State<ResortsState>) -> JsonValue {
    let new_resort = Resort::new(resort.0.name, resort.0.description, Some(id.clone()));

    let mut resorts = state.write().unwrap();

    let option_result = resorts.iter().position(|i| i.id == id);

    if option_result == None {
        return json!({
            "updated": false
        })
    }

    let index_found = option_result.unwrap();

    resorts[index_found] = new_resort;

    json!({
        "updated": true
    })
}

#[delete("/resorts/<id>")]
fn delete_resort(id: String, state: State<ResortsState>) -> JsonValue {
    let mut resorts = state.write().unwrap();

    let option_result = resorts.iter().position(|i| i.id == id);

    if option_result == None {
        return json!({
            "deleted": false
        })
    }

    let index_found = option_result.unwrap();

    resorts.remove(index_found);

    json!({
        "deleted": true
    })
}

#[catch(404)]
fn not_found() -> JsonValue {
    json!({
        "message": "Not Found"
    })
}

#[catch(503)]
fn service_not_available() -> JsonValue {
    json!({
        "message": "Service is not available."
    })
}

fn main() {
    let initial_resorts: Vec<Resort> = Vec::new();
    let initial_users: Vec<User> = Vec::new();
    rocket::ignite()
        .register(catchers![
            not_found,
            service_not_available
        ])
        .manage(RwLock::new(initial_resorts))
        .manage(RwLock::new(initial_users))
        .mount("/",
            routes![
				index,
				get_resorts_list,
				add_resort,
				update_resort,
                delete_resort,
                add_user,
                get_users
            ]
        )
        .attach(make_cors())
        .launch();
}