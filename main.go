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
	http.HandleFunc("/api/municipalities", allMunicipalities)
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

//Municipality is an example json struct
type Municipality struct {
	Geocode string `json:"geocode"`
	Density int    `json:"density"`
}

//Municipalities is an array of Article
type Municipalities []Municipality

func allMunicipalities(w http.ResponseWriter, r *http.Request) {
	articles := Municipalities{
		Municipality{Geocode: "1200336", Density: 90},
		Municipality{Geocode: "1300201", Density: 400},
	}
	fmt.Println("Endpoint hit: All municipalities")
	json.NewEncoder(w).Encode(articles)
}

func mapAPI(w http.ResponseWriter, r *http.Request) {
	geojson, _ := ioutil.ReadFile("./static/brazil-municipalities.json")
	fmt.Fprintf(w, string(geojson))
}
