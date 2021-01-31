#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use std::time::{ SystemTime };

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

type CurrentState = RwLock<Vec<Resort>>;

#[derive(Serialize, Deserialize)]
struct Resort {
    #[serde(default)]
    id: String,
    name: String,
    description: String
}

impl Resort {
    pub fn new(name: String, description: String, id: Option<String>) -> Self {
        let mut current_id = "".to_string();
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

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000"
    ]);

    CorsOptions {
        allowed_origins,
        allow_credentials: true,
        allowed_headers: AllowedHeaders::All,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
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

#[get("/resorts")]
fn get_resorts_list(state: State<CurrentState>) -> JsonValue {
    let data = state.read().unwrap();
    let resorts: Vec<&Resort> = data.iter().collect::<Vec<&Resort>>();
    json!(resorts)
}

#[post("/resorts", data = "<resort>")]
fn add_resort(resort: Json<Resort>, state: State<CurrentState>) -> JsonValue {
    let id = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis();

    let mut new_resort = Resort::new(resort.0.name, resort.0.description, None);

    new_resort.id = id.to_string();

    let mut resorts = state.write().unwrap();

    resorts.push(new_resort);

    json!({
        "created": true
    })
}

#[patch("/resorts/<id>", data = "<resort>")]
fn update_resort(id: String, resort: Json<Resort>, state: State<CurrentState>) -> JsonValue {
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
fn delete_resort(id: String, state: State<CurrentState>) -> JsonValue {
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
    rocket::ignite()
        .register(catchers![
            not_found,
            service_not_available
        ])
        .manage(RwLock::new(initial_resorts))
        .mount("/",
            routes![
				index,
				get_resorts_list,
				add_resort,
				update_resort,
				delete_resort
            ]
        )
        .attach(make_cors())
        .launch();
}