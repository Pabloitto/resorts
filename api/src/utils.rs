use std::time::{ SystemTime };

pub fn get_id() -> String {
  SystemTime::now()
    .duration_since(SystemTime::UNIX_EPOCH)
    .unwrap()
    .as_millis()
    .to_string()
}