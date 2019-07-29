// DONE TASKS:
// get all genres - DONE 
// get subgenres of selected genre - DONE
// disabled heading on restart/last section - DONE
// reset app from begining with no selecting - DONE
// disabled all button before select genre or subgenre - DONE
// dinamicaly changes a breadcrumb  - DONE
// add new subgenre in selected genre JSON and check does description is needed - DONE
// validation form and description based on choosed subgenres - DONE

// REMAINING TASKS:
// 'fake fetch' technique that will console the log request after form submitted
// add attachment and other functionality in decription textarea

app.controller("mainCtrl", mainController);

function mainController($scope, $httpBackend, db) {
    $scope.allGenres = db.allGenres;
    $scope.requiredIfTrue = true;
    
    /** Step flow and breadcrumb **/
    $scope.step = 1;
    $scope.subgenre = true;
    $scope.withoutSubgenre = true;
    $scope.resetStep = false;
    $scope.stepNo = "...";
    $scope.stepTitle = " ";
    $scope.setStep = function (step) {
        $scope.step = step;
        if($scope.step == 1 || $scope.step == 2){
            $scope.stepNo = "...";
            $scope.stepTitle = " ";
            $scope.withoutSubgenre = true;
            $scope.resetStep = false;
        }
        else if($scope.step == 22){
            $scope.stepNo = "3";  
            $scope.stepTitle = "Add new Subgenre";
            $scope.withoutSubgenre = false;
            $scope.counter = 1;
        }
        else if($scope.step == 3 && $scope.withoutSubgenre == true){
            $scope.stepNo = "3"; 
            $scope.stepTitle = "Info";
            $scope.counter = 0;
        }
        else if($scope.step == 4){
            $scope.resetStep = true;
        }
    }
    
    /** Disabled-enabled buttons **/
    // Genre section
    $scope.genreIsDisabled = true;
    $scope.genreBtnEnabled = function (genre) {
        if ($scope.genreSelected === genre) {
            $scope.genreIsDisabled = true;
            $scope.genreSelected = null;
            console.log("Button is not selected.");
        } 
        else{
            $scope.genreIsDisabled = false;
            $scope.genreSelected = genre;
            $scope.activeGenre = genre.subgenres; 
            console.log("Button is selected.");
        }
    }
    // Subgenre section
    $scope.subgenreIsDisabled = true;
    $scope.subgenreBtnEnabled = function (subgenre) {
        if ($scope.subgenreSelected === subgenre) {
            $scope.subgenreIsDisabled = true;
            $scope.subgenreSelected = null;
            console.log("Button is not selected.");
        } 
        else {
            $scope.subgenreIsDisabled = false;
            $scope.subgenreSelected = subgenre;
            $scope.selectedSubgenre = subgenre.isDescriptionRequired;
            console.log("Button is selected.");
            // Check does desciptions is required in info form
            if($scope.selectedSubgenre == false){
                $scope.requiredIfTrue = false;
            }
        }
    }
    
    /** Add new subgenre and validate form **/ 
    $scope.subgenreSubmit = function(user){
        let selected = $scope.genreSelected;
        let db = selected.subgenres;
        let subgenreInput = user.subgenreInput;
        let subgenreDesc = user.subgenreDesc;
        let id;
        // Check does desciptions is required in info form
        if(subgenreDesc == false){
            $scope.requiredIfTrue = false;
        }
        // id auto-increment - FALSE
        db.forEach(function(i, ids, array){
            if (ids === array.length - 1){  
                id = i.id + 1;
            }
        });
        // New Subgenre object
        let newSubgenre = {
            "id" : id,
            "name" : subgenreInput,
            "isDescriptionRequired" : subgenreDesc
        };
        db.push(newSubgenre);
        console.log('New subgenre added!');
        console.log(db);
    }

    /** Form data and validation for info **/ 
    // Author dropdown data
	$scope.authors = [
		{ id: 0, name: 'Thomas Mann' }, 
		{ id: 1, name: 'Edgar Allan Poe' }, 
		{ id: 2, name: 'William Shakespeare' },
		{ id: 3, name: 'Brothers Grimm' },
		{ id: 4, name: 'Friedrich Nietzsche' },
		{ id: 5, name: 'Charles Dickens' }
	];

    // Publisher dropdown data
    $scope.publishers = [
        { id: 1, name: "Fisher" },
        { id: 2, name: "Springer" },
        { id: 3, name: "Wiley" },
        { id: 4, name: "Pearson Education"}
    ];
    
    // Format dropdown data
	$scope.formats = [
		{ id: 0, name: 'Novella: 5" x 8"' }, 
		{ id: 1, name: 'Fiction: 4.25" x 6.87"' }, 
		{ id: 2, name: 'Children`s: 7.5" x 7.5"' },
		{ id: 3, name: 'Textbooks: 6" x 9"' },
		{ id: 4, name: 'Non-fiction: 5.5" x 8.5"' },
		{ id: 5, name: 'Memoir: 5.25" x 8"' }
	];
    
    // Edition language dropdown data
	$scope.languages = [
		{ id: 0, name: 'English UK' }, 
		{ id: 1, name: 'English USA' }, 
		{ id: 2, name: 'German' },
		{ id: 3, name: 'Russian' },
		{ id: 4, name: 'Spanish' },
		{ id: 4, name: 'Mandarin Chinese' },
		{ id: 5, name: 'French' }
	];

    // Add new info book and fetch it
    $scope.infoSubmit = function(user){  
        let desc = user.description; 
        if(typeof user.description === 'undefined'){
           desc = "None";
        }
        let newBookAdded = {
            "Book title" : user.booktitle,
            "Author" : user.author,
            "ISBN" : user.isbn,
            "Publisher" : user.publisher,
            "Date" : user.date,
            "Number of pages" : user.numpages,
            "Format" : user.format,
            "Edition" : user.edition,
            "Language" : user.language,
            "Description" : desc
        };
        let bookList = [];
        bookList.push(newBookAdded);
        console.log('New Book added!');
        console.log(bookList);
    }

    //Reset after finished
    $scope.reset = function () {
        $scope.genreIsDisabled = true;
        $scope.subgenreIsDisabled = true;
        $scope.genreSelected = null;
        $scope.subgenreSelected = null;
    }
};