window.onload = function () {
    //buttons
    var addBtn = document.getElementById("add");
    var addFormDiv = document.querySelector(".addForm");

    //form fields:
    var fullname = document.getElementById("fullname");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    //address book display
    var addBookdiv = document.querySelector(".addbook");

    //Intialize storage array
    var dataArray = [];

    //eventListeners
    addBtn.addEventListener("click", addToBook);
    addBookdiv.addEventListener("click", removeContact);

    function structure(fullname, phone, email) {
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
    }

    function addToBook() {
        //test if fields are empty
        var testIfempty = fullname.value != '' && phone.value != '' && email.value != '';
        //console.log(testIfempty);

        if (testIfempty) {
            //add contents to array and add contents to localstorage
            var obj = new structure(fullname.value, phone.value, email.value);
            dataArray.push(obj);
            localStorage['contactInfo'] = JSON.stringify(dataArray);

            //clear form
            clearForm();

            //update display from the form data collected
            displayContactInfo();
        }

    }

    function clearForm() {
        var filledForm = document.querySelectorAll(".formFields");
        for (var i in filledForm) {
            filledForm[i].value = "";
        }
    }

    function removeContact(e) {
        if (e.target.classList.contains("removeButton")) {
            var rmId = e.target.getAttribute("data-id");

            dataArray.splice(rmId, 1);
            //update localstorage
            localStorage['contactInfo'] = JSON.stringify(dataArray);
            displayContactInfo();
        }
    }

    function displayContactInfo() {
        //look for localstorage key if not present create it
        //if exists load content from LS and loop it on page for div to populate

        if (localStorage['contactInfo'] === undefined) {
            localStorage['contactInfo'] = "[]" //string
        } else {
            dataArray = JSON.parse(localStorage['contactInfo']);
            addBookdiv.innerHTML = '';
            for (var i in dataArray) {
                var str = '<div class="entry">';
                str += '<div class="name"><p>' + dataArray[i].fullname + '</p></div>';
                str += '<div class="email"><p>' + dataArray[i].email + '</p></div>';
                str += '<div class="phone"><p>' + dataArray[i].phone + '</p ></div>';
                str += '<div class="del"><a href="#" class="removeButton" data-id="' + i + '" >Delete</a></div>';
                str += '</div >';
                addBookdiv.innerHTML += str;
            }
        }
    }

    displayContactInfo();
}