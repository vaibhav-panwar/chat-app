function addUser(users,data){
    users.push(data);
    return users
}

function deleteUser(users,id){
    let count = 0;
    for(let i=0;i<users.length;i++){
        if(users[i].id==id){
            count = i;
        }
    }
    return users.splice(count,1)[0];
    
}

module.exports = {addUser,deleteUser}