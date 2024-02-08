// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::prelude::{DateTime, Utc};
use serde::Serialize;
use std::{
    env::{current_dir, set_current_dir},
    fs, io,
};

#[derive(Serialize)]
struct FDir {
    name: String,
    is_dir: i8,
    path: String,
    extension: String,
    size: String,
    last_modified: String,
    is_ftp: i8,
}

#[derive(Serialize)]
struct FileMetadata {
    path: String,
    metadata_type: String,
    is_empty: bool,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_current_dir,
            list_dirs,
            open_dir,
            go_back
        ])
        .plugin(tauri_plugin_app::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_current_dir() -> String {
    return current_dir()
        .unwrap()
        .as_path()
        .to_str()
        .unwrap()
        .to_string()
        .replace("\\", "/");
}

#[tauri::command]
async fn list_dirs() -> Vec<FDir> {
    let mut dir_list: Vec<FDir> = Vec::new();
    let current_dir = fs::read_dir(current_dir().unwrap()).unwrap();
    for item in current_dir {
        let temp_item = item.unwrap();
        let name = &temp_item.file_name().into_string().unwrap();
        let path = &temp_item
            .path()
            .to_str()
            .unwrap()
            .to_string()
            .replace("\\", "/");
        let file_ext = ".".to_string().to_owned()
            + &path
                .split(".")
                .nth(&path.split(".").count() - 1)
                .unwrap_or("");
        let file_data = fs::metadata(&temp_item.path());
        let file_date: DateTime<Utc>;
        let size = temp_item.metadata().unwrap().len();
        if file_data.is_ok() {
            file_date = file_data.unwrap().modified().unwrap().clone().into();
        } else {
            file_date = Utc::now();
        }
        let is_dir_int = match temp_item.path().is_dir() {
            true => 1,
            false => 0,
        };
        dir_list.push(FDir {
            name: String::from(name),
            is_dir: is_dir_int,
            path: String::from(path),
            extension: file_ext,
            size: size.to_string(),
            last_modified: String::from(file_date.to_string().split(".").nth(0).unwrap()),
            is_ftp: 0,
        });
    }
    dir_list.sort_by_key(|a| a.name.to_lowercase());
    return dir_list;
}

#[tauri::command]
async fn open_dir(_path: String) -> Vec<FDir> {
    let _ = set_current_dir(_path);
    return list_dirs().await;
}

#[tauri::command]
async fn go_back() -> Vec<FDir> {
    let _ = set_current_dir("./../");
    return list_dirs().await;
}
