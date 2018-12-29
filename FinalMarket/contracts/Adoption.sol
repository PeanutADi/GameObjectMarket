pragma solidity ^0.4.4;

contract Adoption {
	address[16] public adopters;
	address[16] public sellers;

	// Adopting a pet
	function adopt(uint petId) public returns (uint) {
		require(petId >= 0 && petId <= 15);

		adopters[petId] = msg.sender;

		return petId;
	}

	function onShelf(uint id) public returns (uint) {
			require(id >= 0 && id <= 15,"Id out of range");
			sellers[id] = msg.sender;
			return id;
	}

	// Retrieving the adopters
	function getAdopters() public returns (address[16]) {
  	return adopters;
	}

	function getSeller() public returns (address[16]) {
		return sellers;
	}

	function buy(address seller) public payable {
        uint highestBid = msg.value;
        seller.transfer(highestBid);
    }
}
