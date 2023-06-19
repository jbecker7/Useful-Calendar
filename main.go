package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/date", handleDate).Methods("GET")

	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8080", handler)
}

func handleDate(w http.ResponseWriter, r *http.Request) {
	currentTime := time.Now()
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprintf(w, currentTime.Format("01/02/2006"))
}
