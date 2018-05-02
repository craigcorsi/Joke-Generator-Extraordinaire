
  function Cib() {

    // to DOM elements   -- topic history section
    this.topicList = document.getElementById('topic-list');
    this.topicName = document.getElementById('topic-name');
    this.topicTimeSearched = document.getElementById('topic-time-searched');
    this.topicDetail = document.getElementById('topic-detail')

    this.usernameInput = document.getElementById('username');
    this.topicInput = document.getElementById('first-search-term')
    this.definitionsChoice = this.getDefinitionsChoice();
    this.finalDefinitionsChoice = this.getFinalDefinitionsChoice();

    // to DOM elements -- build process
    this.usernameSubmitButton = document.getElementById('usernameSubmit');
    this.topicSubmitButton = document.getElementById('button-submit-term');
    this.definitionsSubmitButton = document.getElementsByClassName('definitionsSubmit')

    this.usernameForm = document.getElementById("usernameForm");
    this.topicForm = document.getElementById("topic-form");
    //this.definitionsForm = document.getElementById()
    

    // save topic on submit
    console.log(this.usernameForm);
    console.log(this.topicForm);
    this.usernameForm.addEventListener('submit', this.saveUsername.bind(this));
    this.topicForm.addEventListener('submit', this.saveTopic.bind(this));
    //this.topicForm.addEventListener('submit', this.saveDefinitions.bind(this)); 
    
    //toggle for the buttons
    var buttonTogglingHandler = this.toggleButton.bind(this);
    // this.usernameInput.addEventListener('keyup', this.loadTopicHistory.bint(this));
    // this.usernameInput.addEventListener('change', this.loadTopicHistory.bint(this));
    this.Topic_TEMPLATE = `<div class="list-group-item list-group-item-action flex-column align-items-start active">
                      <div class="d-flex w-100 justify-content-left">
                          <h6 class="mb-1" id="topic-name">topicName</h6>
                          <small id="topic-time-searched">timeSearched</small>
                      </div>
                      <small>Find out</small>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#def-final">
                          Final definition
                      </button>
                      </div>`;

    this.initFirebase();
  }

  Cib.prototype.loadUsername = function() {
    
    var setUsername = function(data) {
      var val = data.val();
      console.log(data, val);
      this.displayUsername(data.key, val.name)
    }.bind(this);

    this.usersRef.limitToLast(1).on('child_added', setUsername);
    //this.usersRef.limitToLast(1).on('child_changes', setUserName);
  }

  Cib.prototype.displayUsername = function(key, name) {
    document.querySelector('#username').value = name;
  }

  Cib.prototype.saveUsername = function(e) {
    e.preventDefault();

    if (this.usernameInput.value) {
      var currentUsername = this.usernameInput.value;

      this.usersRef.push({
        name: currentUsername
      }).then(function() {
        //Cib.resetMaterialTextfield(this.usernameInput);
        this.toggleButton(this.usernameInput, this.usernameSubmitButton);
      }.bind(this)).catch(function(error) {
        console.error('Error saving username to firebase', error);
      });
    }
  };

  Cib.prototype.createTopicCard = function(val) {
    var timeSearched;
    if (!val.hasOwnProperty('searchedTime')) {
      timeSearched = 'not known';
    }
    else {
      console.log(val.searchedTime);
      timeSearched = moment.unix(val.searchedTime/1000).format("LLL"); 
    }
      
    var card = `<div class="list-group-item list-group-item-action flex-column mb-1 align-items-start active">
                <div class="d-flex w-100 justify-content-left">
                    <h5 class="mb-1 mr-4" id="topic-name">${val.topic}</h5>
                    <small class="align-right" id="topic-time-searched">${timeSearched}</small>
                </div>
                <small>View </small>
                <button type="button" class="btn btn-primary modal-btn" data-toggle="modal" data-target=".def-final">
                    Final definition
                </button>
                </div>`;
    return card;
  }


  //https://codepen.io/jkrehm/pen/OybdrW ****************************************
  Cib.prototype.createDefinitionListItem = function(val) {
    var topic, definitions, definitionListItem;
    topic = val.hasOwnProperty('topic') ? val.topic : 'Not known';
    definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
    
    $(document).find('.topic-title').text(topic);

    $(document).find('.definition-list > ul').empty();
    definitions.forEach(function(definition) {
      definitionListItem = '';
      definitionListItem = `<li>${definition}</li>`;
      $(document).find('.definition-list > ul').append(definitionListItem);
    })
    
  }

  Cib.prototype.loadTopics = function() {
    var setTopics = function(data) {
      var val = data.val();
      console.log(data, val);
      this.displayTopic(data.key, val)
    }.bind(this);

    this.topicsRef.limitToLast(3).on('child_added', setTopics);
  }

  Cib.prototype.displayTopic = function(key, val) {
   
      // console.log(key, val.topic, val.searchedTime);
      // var topicName = val.topic;
       //document.querySelector('#topic-list').append(this.Topic_TEMPLATE);
      $(document).find('#topic-list').append(this.createTopicCard(val));
  }

  Cib.prototype.saveTopic = function(e) {
    //e.preventDefault();

    if (this.topicInput.value) {
      console.log(this.topicInput.value);
      var topicInputValue = this.topicInput.value;
      var usernameInputValue = this.usernameInput.value;
      console.log(firebase.database.ServerValue.TIMESTAMP);

      this.topicsRef.push({
        username: usernameInputValue,
        topic: topicInputValue, 
        searchedTime: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        //Cib.resetMaterialTextfield(this.topicInput);
        this.toggleButton(this.topicInput, this.topicSubmitButton);
      }.bind(this)).catch(function(error) {
        console.error('Error saving username to firebase', error);
      });
    }
  }

  Cib.prototype.loadDefinitions = function() {
    var setDefinitions = function(data) {
      var val = data.val();
      console.log(data, val);
      this.displayDefinition(data.key, val)
    }.bind(this);

    this.definitionsRef.limitToLast(3).on('child_added', setDefinitions);
  }


  // load modal content on click the button "#modal-brn"
  $(document).on('click', '.modal-btn', function() {
    // $(document).load(this.loadDefinitions, '.definition-list', function() {
    //   $(document).find('.def-final').modal({show:true});
    // });

    // $('.definition-list').load(this.loadDefinitions, function() {
    //   $('.def-final').modal({show:true});
    // });
    console.log("are inside");
    $(".definition-list > ul").append("some test");

    Cib.loadDefinitions();
  });

  

  
  Cib.prototype.displayDefinition = function(key, val) {
   
    this.createDefinitionListItem(val);
    // console.log(key, val.topic, val.searchedTime);
    // var topicName = val.topic;
     //document.querySelector('#topic-list').append(this.Topic_TEMPLATE);
    $(document).find('.definition-list > ul').append(this.createDefinitionListItem(val));
  }

  Cib.prototype.saveDefinition = function() {
    //e.preventDefault();

    if (this.definitionsChoice) {
      var definitionsInputValue = this.getDefinitionsChoice();
      var topicInputValue = this.topicInput.value;
      var usernameInputValue = this.usernameInput.value;

      this.definitionsRef.push({
        username: usernameInputValue,
        topic: topicInputValue,
        definitions: [definitionsInputValue]
      }).then(function() {
        //Cib.resetMaterialTextfield(this.definitionsInput);
        //this.toggleButton();
      }.bind(this)).catch(function(error) {
        console.error('Error saving username to firebase', error);
      });
    }
  }

  Cib.prototype.loadFinalDefinitions = function() {

  }

  Cib.prototype.saveFinalDefinition = function() {
    e.preventDefault();

    if (this.definitionsChoice) {
      var finalDefinitionsInpoutValue = this.finalDefinitionsChoice;
      var definitionsInputValue = this.definitionsChoice;
      var topicInputValue = this.topicInput.value;
      var usernameInputValue = this.usernameInput.value;

      this.definitionsRef.push({
        username: usernameInputValue,
        topic: topicInputValue,
        definitions: [definitionsInputValue], 
        finalDefinitions: [finalDefinitionsInpoutValue]
      }).then(function() {
        //Cib.resetMaterialTextfield(this.definitionsInput);
        this.toggleButton();
      }.bind(this)).catch(function(error) {
        console.error('Error saving username to firebase', error);
      });
    }
  }

  Cib.resetMaterialTextfield = function(element) {
    element.value= '';
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
  }
  
  Cib.prototype.initFirebase = function() {
      // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBAzJASB24wN0wIl6thXorHwR-chDomOC0",
      authDomain: "comedy-ideas-bot.firebaseapp.com",
      databaseURL: "https://comedy-ideas-bot.firebaseio.com",
      projectId: "comedy-ideas-bot",
      storageBucket: "comedy-ideas-bot.appspot.com",
      messagingSenderId: "370350822665"
    };

    firebase.initializeApp(config);
    this.database = firebase.database();

    this.usersRef = this.database.ref('users');
    this.topicsRef = this.database.ref('topics');
    this.definitionsRef = this.database.ref('definitions');
    this.finalDefinitionsRef = this.database.ref('finalDefinitions');
  }

  Cib.prototype.getDefinitionsChoice = function() {
    // var selectedDefinitions = document.getElementsByClassName('option-ask')
    //         .children('.defChoice[data-selected=true]');

    var selectedDefinitions2 = document.querySelectorAll('.option-ask > .defChoice[data-selected=true]');
    console.log(selectedDefinitions2);
    var defs= [];
    selectedDefinitions2.forEach(function(item) {
      defs.push(item.textContent);
    })
    return defs;
  }

  Cib.prototype.getFinalDefinitionsChoice = function() {
    // var selectedFinalDefinitions = document.getElementsByClassName('search-results-here > div')
    //         .children('wordCell');

    var selectedFinalDefinitions2 = document.querySelectorAll('.words-in-cell');
    console.log(selectedFinalDefinitions2);
    var finalDefs= [];
    selectedFinalDefinitions2.forEach(function(item) {
      defs.push(item.textContent);
    })
    return finalDefs;
  }

  // Enables or disables the submit button depending on the values of the input fields.
  Cib.prototype.toggleButton = function(element, submitButton) {

    if (element.value) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }

    // if (this.usernameInput.value) {
    //   this.submitButton.removeAttribute('disabled');
    // } else {
    //   this.submitButton.setAttribute('disabled', 'true');
    // }
  };
    
//   Cib.TOPIC_TEMPLATE = ` <a hrref="#" class="list-group-item list-group-item-action flex-column align-items-start">
//   <div class="d-flex w-100 justify-content-between">
//       <h5 class="mb-1" id="topic-name">${topicName}</h5>
//       <small class="text-muted" id="topic-searched-time">${timeSearched}</small>
//   </div><p class="mb-1" id="topic-detail">${detailList}</small>
// </a>`;



  window.onload = function() {
    window.Cib = new Cib();
    Cib.loadUsername();
    Cib.loadTopics();
    //Cib.loadDefinitions();
  }




// get the data 
// var loadTopicHistory = function (user, $topicList) {

//   dataRef.ref("/topics").on("child_added", function (snap) {
//     var topicName = snap.val().name;
//     //var definitions = snap.val().definitions;
//     var timeSearched = snap.val().earchedTime;

//     var userInfo = snap.val().username;

//     var detailList = getDefinitionListForTopic(definitions);
//     var content = ` <a hrref="#" class="list-group-item list-group-item-action flex-column align-items-start">
//                                 <div class="d-flex w-100 justify-content-between">
//                                     <h5 class="mb-1" id="topic-name">${topicName}</h5>
//                                     <small class="text-muted" id="topic-searched-time">${timeSearched}</small>
//                                 </div><p class="mb-1" id="topic-detail">${detailList}</small>
//                             </a>`;
//     $topicList.append(content);
//   });
// };


