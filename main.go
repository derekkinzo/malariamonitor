package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/map", mapAPI)
	http.HandleFunc("/articles", allArticles)
	http.HandleFunc("/", mapHandler)
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static"))))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

const (
	htmlExtension = ".html"
	mapPageName   = "map"
)

var templates = template.Must(template.ParseGlob("templates/*.html"))

func mapHandler(w http.ResponseWriter, r *http.Request) {
	err := templates.ExecuteTemplate(w, "map.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

//Article is an example json struct
type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"dec"`
	Content string `json:"content"`
}

//Articles is an array of Article
type Articles []Article

func allArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Test title", Desc: "Test desc", Content: "Test content"},
	}
	fmt.Println("Endpoint hit: All articles")
	json.NewEncoder(w).Encode(articles)
}

func mapAPI(w http.ResponseWriter, r *http.Request) {
	geojson, _ := ioutil.ReadFile("./static/brazil-municipalities.json")
	fmt.Fprintf(w, string(geojson))
}
