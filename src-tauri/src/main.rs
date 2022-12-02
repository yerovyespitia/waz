#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate reqwest;

use std::io;
use std::fs::File;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn download_ep(url: String, path: String) {
    let save_file_path = path;
    let resp = reqwest::blocking::get(url).expect("request failed");
    let body = resp.text().expect("body invalid");
    let mut out = File::create(save_file_path).expect("failed to create file");
    let mut body_bytes = body.as_bytes();
    io::copy(&mut body_bytes, &mut out).expect("failed to copy content");

    println!("download completed!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download_ep])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
