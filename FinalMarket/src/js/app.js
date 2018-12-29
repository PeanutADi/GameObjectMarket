App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
        // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-submit', App.handleSubmit);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleSubmit: function(event){
    event.preventDefault();
    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
        return  adoptionInstance.onShelf(submitId, {from: account});
      }).catch(function(err) {
        console.log(err.message);
      });
    });
    var petsRow = $('#petsRow');
    var petTemplate = $('#petTemplate');
    submitId++;
    petTemplate.find('.panel-title').text($('#nameText').val());
    petTemplate.find('img').attr('src', $('#path').val());
    petTemplate.find('.pet-age').text($('#priceInput').val());
    petTemplate.find('.btn-adopt').attr('data-id', submitId);
    petTemplate.find('.btn-adopt').attr('data-price', $('#priceInput').val());
    petsRow.append(petTemplate.html());
  },

  handleAdopt: function(event) {
    event.preventDefault();
    var petId = parseInt($(event.target).data('id'));
    var goodPrice = parseInt($(event.target).data('price'));
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
        return adoptionInstance.getSeller.call();
      }).then(function(sellers){
        // Execute adopt as a transaction by sending account
        $(event.target).text('Success').attr('disabled', true);
        return adoptionInstance.buy(sellers[petId],{from: account,value:web3.toWei(goodPrice,"ether")});
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    submitId = -1;
    App.init();
  });
});
