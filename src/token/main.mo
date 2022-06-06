import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Token {
    let owner : Principal = Principal.fromText("rav4d-734hi-6mau7-djbkw-n23kw-edbsj-w7sla-itxml-eubfo-t6yer-pae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "INC";
    let name : Text = "Indian National Crypto";
    let bonusAmount : Nat = 1000;

    private stable var balanceEntries : [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    public query func balanceOf(who : Principal) : async Nat {
        let amt : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return amt;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public query func getName() : async Text {
        return name;
    };

    public shared(msg) func firstBonus() : async Text {
        let principalID = msg.caller;
        if(balances.get(principalID) == null) {
            let result = await transfer(bonusAmount, principalID);
            return result;
        } else {
            return "Already Claimed";
        };
    };

    public shared(msg) func transfer(amount : Nat, reciever : Principal) : async Text {
        let principalID = msg.caller;
        if(balances.get(principalID) == null) {
            return "You dont have an account";
        } else if(principalID == reciever) {
            return "Reciever and sender cannot be same";
        } else {
            let balance = await balanceOf(principalID);
            let balance2 = await balanceOf(reciever);
            if(balance >= amount) {
                balances.put(principalID, balance - amount);
                balances.put(reciever, balance2 + amount);
                return "Success";
            }
            else {
                return "You dont have sufficient funds";
            }
        };
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if(balances.get(owner) == null) {
            balances.put(owner, totalSupply);
        };
    };
};