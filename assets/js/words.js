function Cib() {

    // to DOM elements   -- topic history section
    this.topicList = document.getElementById('topic-list');
    this.topicName = document.getElementsByClassName('topic-name');
    this.topicTimeSearched = document.getElementsByClassName('topic-time-searched');
    this.topicDetail = document.getElementsByClassName('topic-detail')
  
    this.usernameInput = document.getElementById('username');
    this.topicInput = document.getElementById('first-search-term')
    this.definitionsChoice = this.getDefinitionsChoice();
    this.finalDefinitionsChoice = this.getFinalDefinitionsChoice();
  
    // to DOM elements -- element build process
    this.usernameSubmitButton = document.getElementById('usernameSubmit');
    this.topicSubmitButton = document.getElementById('button-submit-term');
    this.definitionsSubmitButton = document.getElementsByClassName('definitionsSubmit')
  
    this.usernameForm = document.getElementById("usernameForm");
    this.topicForm = document.getElementById("topic-form");
    //this.definitionsForm = document.getElementById()
  
    console.log(this.usernameForm);
    console.log(this.topicForm);
  
    // save to firebase on submit
    this.usernameForm.addEventListener('submit', this.saveUsername.bind(this));
    this.topicForm.addEventListener('submit', this.saveTopic.bind(this));
    //this.topicForm.addEventListener('submit', this.saveDefinitions.bind(this)); 
  
    //toggle for the buttons
    var buttonTogglingHandler = this.toggleButton.bind(this);
    // this.usernameInput.addEventListener('keyup', this.loadTopicHistory.bint(this));
    // this.usernameInput.addEventListener('change', this.loadTopicHistory.bint(this));
  
    this.Topic_TEMPLATE = `<div class="list-group-item list-group-item-action flex-column align-items-start active">
                        <div class="d-flex w-100 justify-content-left">
                            <h6 class="mb-1 topic-name">topicName</h6>
                            <small class="topic-time-searched">timeSearched</small>
                        </div>
                        <small>Find</small>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".def-final">
                            Final definition
                        </button>
                        </div>`;
  
    this.mostRecentDefinition = { topic: '', username: '', definitions: [], timeSearched: 0};
  
  
    this.initFirebase();
  }
  
  Cib.prototype.loadUsername = function () {
  
    var setUsername = function (data) {
      var val = data.val();
      console.log(data, val);
      this.displayUsername(data.key, val.name)
    }.bind(this);
  
    this.usersRef.limitToLast(1).on('child_added', setUsername);
    //this.usersRef.limitToLast(1).on('child_changes', setUserName);
  }
  
  /**
   * username related
   * @param {*} key 
   * @param {*} name 
   */
  Cib.prototype.displayUsername = function (key, name) {
    document.querySelector('#username').value = name;
  }
  
  Cib.prototype.saveUsername = function (e) {
    e.preventDefault();
  
    if (this.usernameInput.value) {
      var currentUsername = this.usernameInput.value;
  
      this.usersRef.push({
        name: currentUsername
      }).then(function () {
        //Cib.resetMaterialTextfield(this.usernameInput);
        this.toggleButton(this.usernameInput, this.usernameSubmitButton);
      }.bind(this)).catch(function (error) {
        console.error('Error saving username to firebase', error);
      });
    }
  };
  
  /**
   * topic related
   * @param {*} val 
   */
  
  Cib.prototype.loadTopics = function () {
    var setTopics = function (data) {
      var val = data.val();
      console.log(data, val);
      this.displayTopic(data.key, val)
  
      // after each topic card is created/displayed, load definitions
      //this.loadDefinitions();
  
    }.bind(this);
  
    this.topicsRef.limitToLast(3).on('child_added', setTopics);
  }
  
  Cib.prototype.displayTopic = function (key, val) {
  
    // console.log(key, val.topic, val.searchedTime);
    // var topicName = val.topic;
    //document.querySelector('#topic-list').append(this.Topic_TEMPLATE);
    $(document).find('#topic-list').append(this.createTopicCard(val));
  }
  
  Cib.prototype.saveTopic = function (e) {
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
      }).then(function () {
        //Cib.resetMaterialTextfield(this.topicInput);
        this.toggleButton(this.topicInput, this.topicSubmitButton);
      }.bind(this)).catch(function (error) {
        console.error('Error saving username to firebase', error);
      });
    }
  }
  
  Cib.prototype.createTopicCard = function (val) {
    var timeSearched;
    if (!val.hasOwnProperty('searchedTime')) {
      timeSearched = 'not known';
    } else {
      console.log(val.searchedTime);
      timeSearched = moment.unix(val.searchedTime / 1000).format("LLL");
    }
  
    var card = `<div class="list-group-item list-group-item-action flex-column mb-1 align-items-start active">
                  <div class="d-flex w-100 justify-content-left">
                      <h5 class="mb-1 mr-4 topic-name">${val.topic}</h5>
                      <small class="align-right topic-time-searched" >${timeSearched}</small>
                  </div>
                  <small>View </small>
                  <button type="button" class="btn btn-primary modal-btn" data-toggle="modal" 
                          data-topic='${val.topic}' data-username='${val.username}' data-searchedTime='${timeSearched}' 
                          data-definitions = '${val.definitions}' 
                          data-finalDefinitions = '${val.finalDefinitions}' 
                          data-target=".def-final"> Final definition
                  </button>
                  </div>`;
    return card;
  }
  
  /**
   * definition related
   */
  //https://codepen.io/jkrehm/pen/OybdrW ****************************************
  Cib.prototype.createDefinitionListItem = function (val) {
    var topic, searchedTime, definitions, definitionListItem;
    topic = val.hasOwnProperty('topic') ? val.topic : 'Not known';
    searchedTime = val.hasOwnProperty('searchedTime') ? val.searchedTime : 0;
    definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
    strDefinitions = JSON.stringify(definitions);
  
    console.log(definitions);
    console.log(JSON.stringify(definitions));
  
    var data = {
      topic: topic,
      searchedTime: searchedTime,
      definitions: strDefinitions
    }
    // do not create topic card at this point. Final Definition process include topic card generation
    $(document).find('#topic-list').append(this.createTopicCard(data));
  }

  Cib.prototype.loadDefinitions = function () {
    var setDefinitions = function (data) {
      var val = data.val();
      console.log(data, val);
      this.displayDefinition(data.key, val)
    }.bind(this);
  
    this.definitionsRef.limitToLast(3).on('child_added', setDefinitions);
  }


    // $(document).find('.definition-list > ul').append(this.createDefinitionListItem(val));

  Cib.prototype.displayDefinition = function(key, val) {
    this.createDefinitionListItem(val);
    
   // $(document).find('.definition-list > ul').append(this.createDefinitionListItem(val));
  }

  Cib.prototype.saveDefinition = function() {

    //e.preventDefault(); // this statement will be needed for normal situation, but this statement is already called in app.js for click event
    if (this.definitionsChoice) {
      var definitionsInputValue = this.getDefinitionsChoice();
      var topicInputValue = this.topicInput.value;
      var usernameInputValue = this.usernameInput.value;

       // temporary save definitions to session storage
       //this.saveDefinitionsToSessionStorage();
  
      this.definitionsRef.push({
        username: usernameInputValue,
        topic: topicInputValue,
        definitions: [definitionsInputValue],
        searchedTime: firebase.database.ServerValue.TIMESTAMP
      }).then(function () {
        //Cib.resetMaterialTextfield(this.definitionsInput);
        //this.toggleButton();
        this.toggleButton(this.topicInput, this.topicSubmitButton);

      }.bind(this)).catch(function (error) {
        console.error('Error saving username to firebase', error);
      });
    }
  }
  
  // Cib.prototype.saveDefinitionsToSessionStorage = function(username, topic, definitions) {
  //   sessionStorage.clear();
  //   sessionStorage.setItem('username', )
  // }
  /**
   * modal thing
   * load modal content on click the button "#modal-btn"
   */
  // $(".def-final").on('show.bs.modal', function(e) {
  //   var targetTopicCard = $(e.relatedTarget);
  //   var username = targetTopicCard.data('username');
  //   var topic = targetTopicCard.data('topic');
  //   var searchedTime = targetTopicCard.data('searchedTime');
  //   var definitions = JSON.parse(targetTopicCard.data('definitions'));
  //   //var definitions = targetTopicCard.data('definitions');
  //   console.log(definitions);
  
  //   // this here is the modal popup
  //   $(this).find('.topic-title').text(topic);
  //   var definitionListItem;
  //   var $definitionList = $(this).find('.modal-body.definition-list > ul').empty();
  //   definitions.forEach(function(definition) {
  //       definitionListItem = '';
  //       definitionListItem = `<li>${definition}</li>`;
  //     $definitionList.append(definitionListItem);
  //   });
  // })
  
  // $(document).on('show.bs.modal', '.def-final', function(e) {
  //   var targetTopicCard = $(e.relatedTarget);
  //   var username = targetTopicCard.data('username');
  //   var topic = targetTopicCard.data('topic');
  //   var searchedTime = targetTopicCard.data('searchedTime');
  //   // var definitions = JSON.parse( targetTopicCard.data('definitions'));
  //   var definitions = targetTopicCard.data('definitions');
  
  //   // this here is the modal popup
  //   $(this).find('.topic-title').text(topic);
  //   var definitionListItem;
  //   var $definitionList = $(this).find('.modal-body.definition-list > ul').empty();
  //   definitions.forEach(function(definition) {
  //       definitionListItem = '';
  //       definitionListItem = `<li>${definition}</li>`;
  //     $definitionList.append(definitionListItem);
  //   });
  // })
  
  $(document).on('click', '.modal-btn', function (e) {
    $(".topic-title").text($(this).attr('data-topic'));
    var definitions = $(this).attr('data-definitions').replace('[', '').replace(']', '');
    var arrDefinitions = [];
    arrDefinitions.push(definitions.split(','));
    var finalDefinitions = $(this).attr('data-finalDefinitions').replace('[', '').replace(']', '');
    var arrFinalDefinitions = [];
    arrFinalDefinitions.push(finalDefinitions.split(','));
  
    console.log(finalDefinitions);
    console.log(Array.isArray(finalDefinitions));
    console.log("arrfinalDefinitions", arrFinalDefinitions);
    console.log(Array.isArray(arrFinalDefinitions));
  
    var definitionListItem, finalDefinitionListItem;
    $(document).find('.definition-list > ul').empty();
    arrDefinitions[0].forEach(function (definition) {
      var definitionTrimed = definition.slice(1, -1);
      definitionListItem = '';
      definitionListItem = `<li>${definitionTrimed}</li>`;
      $(document).find('.definition-list > ul').append(definitionListItem);
    })
    $(document).find('.final-definition-list > ul').empty();
    arrFinalDefinitions[0].forEach(function (finalDefinition) {
      var finalDefinitionTrimed = finalDefinition.slice(1, -1);
      finalDefinitionListItem = '';
      finalDefinitionListItem = `<li>${finalDefinitionTrimed}</li>`;
      $(document).find('.final-definition-list > ul').append(finalDefinitionListItem);
    })
  });
  
  /**
   * final definition related
   */
  Cib.prototype.createFinalDefinitionListItem = function (val) {
    var topic, searchedTime, definitions, definitionListItem, username;
    username = val.hasOwnProperty('username') ? val.username : 'Not known';
    topic = val.hasOwnProperty('topic') ? val.topic : 'Not known';
    searchedTime = val.hasOwnProperty('searchedTime') ? val.searchedTime : 0;
    // definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
    // finalDefinitions = val.hasOwnProperty('finalDefinitions') ? Array.from(val.finalDefinitions[0]) : 'Not known';
  
    definitions = val.hasOwnProperty('definitions') ? val.definitions[0] : 'Not known';
    finalDefinitions = val.hasOwnProperty('finalDefinitions') ? val.finalDefinitions: 'Not known';
  
    console.log("definitions for createTopicCard", definitions);
    // console.log(JSON.stringify(definitions));
    // console.log(val.finalDefinitions[0])
    console.log("finalDefinitions for createTopicCard", finalDefinitions);
    // console.log(JSON.stringify(val.finalDefinitions[0]));
    console.log(JSON.stringify(finalDefinitions));
  
    var data = {
      username: username,
      topic: topic,
      searchedTime: searchedTime,
      definitions: JSON.stringify(definitions),
      finalDefinitions: JSON.stringify(finalDefinitions)
    };
    $(document).find('#topic-list').append(this.createTopicCard(data));
  }
  
  Cib.prototype.loadFinalDefinitions = function () {
    var setFinalDefinitions = function (data) {
      var val = data.val();
      console.log(data, val);
      this.displayFinalDefinition(data.key, val)
    }.bind(this);
  
    this.finalDefinitionsRef.limitToLast(3).on('child_added', setFinalDefinitions);
  }
  
  Cib.prototype.displayFinalDefinition = function (key, val) {
    this.createFinalDefinitionListItem(val);
  
    // $(document).find('.definition-list > ul').append(this.createDefinitionListItem(val));
  }
  


      //var definitionsInputValue = this.getDefinitionsChoice();

  Cib.prototype.displayFinalDefinition = function(key, val) {
    this.createFinalDefinitionListItem(val);
    
   // $(document).find('.definition-list > ul').append(this.createDefinitionListItem(val));
  }

  Cib.prototype.saveFinalDefinition = function(finalDefinitionWords) {
    if (!finalDefinitionWords) return;
    
    //e.preventDefault();
    var strDefinitions;
    var topicName;
    var userName;
    // this.definitionsRef.limitToLast(1).once('child_added', function(snap) {
    //   var val = snap.val();
    //   topicNaem = val.topic;
    //   userName = val.username;
    //   var definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
    //   strDefinitions = JSON.stringify(definitions);
    // });


      var finalDefinitionsInpoutValue = finalDefinitionWords;
      var definitionsInputValue = strDefinitions;
      var topicInputValue = this.topicInput.value;
      var usernameInputValue = this.usernameInput.value;

      this.finalDefinitionsRef.push({
        
        username: usernameInputValue,
        topic: topicInputValue,
        //definitions: definitionsInputValue,
        finalDefinitions: finalDefinitionWords,
        searchedTime: firebase.database.ServerValue.TIMESTAMP
    }).then(function () {
      //Cib.resetMaterialTextfield(this.definitionsInput);
      //this.toggleButton();
      this.toggleButton(this.topicInput, this.topicSubmitButton);
      // load definitions to topic history card
      //this.loadDefinitions();
    }.bind(this)).catch(function (error) {
      console.error('Error saving username to firebase', error);
    });
  }
  
  
  Cib.resetMaterialTextfield = function (element) {
    element.value = '';
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
  }
  
  Cib.prototype.getMostRecentDefinition = function() {
    // get the last definition from firedatabase and  set the most recent definition from firebase as global
    this.definitionsRef.limitToLast(1).once('value').then(function (snap) {
      var val = snap.val();
      Cib.mostRecentDefinition.topic = val.topic;
      Cib.mostRecentDefinition.username = val.username;
      Cib.mostRecentDefinition.definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
      Cib.mostRecentDefinition.timeSearched = val.timeSearched;
      //strDefinitions = JSON.stringify(definitions);
    });
  }
  
  /**
   * firebase initialization
   */
  Cib.prototype.initFirebase = function () {
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
  
  /**
   * pull values from DOM
   */
  Cib.prototype.getDefinitionsChoice = function () {
    // var selectedDefinitions = document.getElementsByClassName('option-ask')
    //         .children('.defChoice[data-selected=true]');
  
    var selectedDefinitions2 = document.querySelectorAll('.option-ask > .defChoice[data-selected=true]');
    console.log(selectedDefinitions2);
    var defs = [];
    selectedDefinitions2.forEach(function (item) {
      defs.push(item.textContent);
    })
    return defs;
  }
  
  Cib.prototype.getLastDefinitionsFromFirebase = function () {
    this.definitionsRef.limitToLast(1).once('value', function (snap) {
      var val = snap.val();
      var definitions = val.hasOwnProperty('definitions') ? Array.from(val.definitions[0]) : 'Not known';
      var strDefinitions = JSON.stringify(definitions);
    });
  }
  
  Cib.prototype.getFinalDefinitionsChoice = function () {
    // var selectedFinalDefinitions = document.getElementsByClassName('search-results-here > div')
    //         .children('wordCell');
  
    var selectedFinalDefinitions2 = document.querySelectorAll('.words-in-cell');
    console.log(selectedFinalDefinitions2);
    var finalDefs = [];
    selectedFinalDefinitions2.forEach(function (item) {
      defs.push(item.textContent);
    })
    return finalDefs;
  }
  
  // Enables or disables the submit button depending on the values of the input fields.
  Cib.prototype.toggleButton = function (element, submitButton) {
  
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
  
  Cib.prototype.createFinalChoiceListItem = function(selector, finalchoice) {
    var content = `<ul class="list-group list-group-flush">
                              <li class="list-group-item final-choice-item">${finalchoice}</li>
                            </ul>`;
    selector.append(content);
  }
  
  Cib.prototype.displayFinalChoices = function (selector, finalChoices) {
    var username = Cib.mostRecentDefinition.username;
    var topic = Cib.mostRecentDefinition.topic;
    var searchedTime = Cib.mostRecentDefinition.searchedTime;
    var content = `<h4 class="mr-6">${topic}<span><h5 class="mr-3">${searchedTime}</h5></span>
                                                                        <span><h6 class="mr-3">${username}</h6></span></h4>`;
    selector.append(content);
  
    // append all choices to the element selector
    finalChoices.forEach(function (val) {
      Cib.createFinalChoiceListItem(selector, val);
    });
  };
  
  // start app
  window.onload = function () {
    window.Cib = new Cib();
    Cib.loadUsername();
    //Cib.loadTopics();
    //Cib.loadDefinitions();
    //Cib.getMostRecentDefinition();
    Cib.loadFinalDefinitions();
  }

