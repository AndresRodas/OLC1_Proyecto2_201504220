package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type task struct {
	ID      int    `json:ID`
	Name    string `json:Name`
	Content string `json:Content`
}
type allTask []task

var tasks = allTask{
	{
		ID:      1,
		Name:    "Task one",
		Content: "Some content",
	},
}

func createTask(w http.ResponseWriter, r *http.Request) {
	//se crea la instancia de la variable
	var newTask task

	//se lee los datos de ingreso
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Valores Invalidos")
	}

	//se asignan los datos a la variable
	json.Unmarshal(reqBody, &newTask)
	fmt.Println(newTask)
	//se asigna nuevo ID
	newTask.ID = len(tasks) + 1
	//Se agrega a la lista de tareas
	tasks = append(tasks, newTask)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)

}

func getTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Esto es un test")
}

func main() {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", indexRoute)
	router.HandleFunc("/task", getTask).Methods("GET")
	router.HandleFunc("/task", createTask).Methods("POST")

	//aqui se sirve el html de la pagina de inicio
	r := mux.NewRouter()
	r.PathPrefix("/server/").Handler(http.StripPrefix("/server/", http.FileServer(http.Dir("./"))))
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		file, err := ioutil.ReadFile("./index.html")
		if err != nil {
			panic(err)
		}
		w.Write(file)
	})
	fmt.Println("Running! on port 3600")
	log.Fatal(http.ListenAndServe(":3600", r))
}
