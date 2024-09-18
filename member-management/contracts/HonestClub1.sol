// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract HonestClub1 {
    address public clubMaster;
    Member[] public members;

    struct Member {
        string name;
        string email;
        bool signIn;
        uint8 level;
        uint registerTime;
    }

    event MemberAdded(string name, string email);
    event MemberRemoved(uint id);
    event MemberLevelAdjusted(uint id, uint8 newLevel);
    event MemberSignedIn(uint id);

    constructor() {
        clubMaster = msg.sender;
    }

    modifier onlyMaster() {
        require(msg.sender == clubMaster, "Sender is not the club master");
        _;
    }

    modifier enoughMaster(uint id) {
        require(id < members.length, "Invalid member id");
        _;
    }

    function add_member(string memory name, string memory email) public onlyMaster {
        require(members.length < 20, "Member limit reached");
        members.push(Member(name, email, false, 1, block.timestamp));
        emit MemberAdded(name, email); // 發送事件通知前端
    }

    function how_many_members() public view returns (uint) {
        return members.length;
    }

    function remove_member(uint id) public onlyMaster enoughMaster(id) {
        members[id] = members[members.length - 1];
        members.pop();
        emit MemberRemoved(id); // 發送事件通知前端
    }

    function adjustLevel(uint id, uint8 newLevel) public onlyMaster enoughMaster(id) {
        require(newLevel > 0, "Level must be greater than zero");
        members[id].level = newLevel;
        emit MemberLevelAdjusted(id, newLevel); // 發送事件通知前端
    }

    function signInMember(uint id) public enoughMaster(id) {
        require(msg.sender == clubMaster || msg.sender == address(this), "Only club master or the member can sign in");
        members[id].signIn = true;
        emit MemberSignedIn(id); // 發送事件通知前端
    }

    function resetSignIn() public onlyMaster {
        for (uint i = 0; i < members.length; i++) {
           members[i].signIn = false;
        }
    }
}
