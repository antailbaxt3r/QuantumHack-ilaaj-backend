pragma solidity ^0.5.0;

contract DocumentContract {
    uint public docCount;
    mapping (string => bool) stringMap;
    constructor () public {
        docCount = 0;
        stringMap["P"] = true;
        stringMap["R"] = false;
    }

    struct Document {
        uint id;
        string user;
        string doctor;
        string docType;
        string link;
    }

    event DocumentAdded(
        uint id,
        string user,
        string doctor,
        string docType,
        string link
    );

    mapping (uint => Document) public docList;     

    function addDocument(string memory _user, string memory _doctor, string memory _docType, string memory _link) public {
        docCount++;
        if(stringMap[_docType] == true){
            docList[docCount] = Document(docCount, _user, _doctor, _docType, _link);
            emit DocumentAdded(docCount, _user, _doctor, _docType, _link);
        }else{
            docList[docCount] = Document(docCount, _user, "", _docType, _link);
            emit DocumentAdded(docCount, _user, "", _docType, _link);
        }
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    function getDocumentLink(uint _id) public returns (string memory) {
        return docList
    }
}