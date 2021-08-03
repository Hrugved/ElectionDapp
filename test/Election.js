// truffle provides us with the abstraction of smart contract to interact with
const Election = artifacts.require('./Election.sol');

// run 'truffle test; for running all tests.

contract("Election", (accounts) => {
  
  it("intializes with two candidates", async () => { // mocha
    const instance = await Election.deployed(); // returns deployed instance of contract
    const count = await instance.candidatesCount();
    assert.equal(count,2); // chai
  })

  it("intializes candidates with correct values", async() => {
    const instance = await Election.deployed();
    var candidate = await instance.Candidates(1);
    assert.equal(candidate.id, 1, "contains the correct id");
    assert.equal(candidate.name, "Candidate 1", "Contains the correct name");
    assert.equal(candidate.voteCount, 0, "Initial vote count must be 0");
    candidate = await instance.Candidates(2);
    assert.equal(candidate.id, 2, "contains the correct id");
    assert.equal(candidate.name, "Candidate 2", "Contains the correct name");
    assert.equal(candidate.voteCount, 0, "Initial vote count must be 0");
  })

  it("allows a voter to cast a vote", async() => {
    const instance = await Election.deployed();
    const candidateId = 1;
    await instance.vote(candidateId, {from: accounts[0]}) // fake metadata 
    const voterVoted = await instance.voters(accounts[0]);
    assert(voterVoted, "the voter was marked as voted");
    const candidate = await instance.Candidates(candidateId);
    const voteCount = candidate.voteCount;
    assert.equal(voteCount, 1, "increments the candidate's vote count");
  })

  it("throws an exception for invalid candidates", async() => {
    try {
      const instance = await Election.deployed();
      const candidatesCount = await instance.candidatesCount();
      await instance.vote(candidatesCount+1,{from: accounts[0]});
    } catch(err) {
      assert(e.message.indexOf('revert')>=0, "error message must contain revert");
    }
  })

  it("throws an exception for double voting", () => {

  })

})


