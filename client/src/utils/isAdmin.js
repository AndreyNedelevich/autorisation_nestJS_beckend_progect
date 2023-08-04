
export const isAdmin=(arrayObjects)=>{
    for(const obj of arrayObjects){
        if(obj.value==="ADMIN") return true
    }
    return false;
}