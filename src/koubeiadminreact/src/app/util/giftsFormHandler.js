
export default function(obj) {
    var newArrObj=_.map(obj, (v,k)=>{
        var tobj={};
        tobj[k.split('--')[1]]=v;
        tobj['i']=k.split('--')[0];
        return tobj
    });
    var allNum=_.map(obj, (v,k)=>{
        return k.split('--')[0]
    });

    var num=_.uniq(allNum).length;
    var newArr=[];
    for(let i=0;i<num;i++){
        newArr.push({});
    }

    newArrObj.forEach((n,i)=>{
        _.assign(newArr[Number(n.i)],n);

    });

    // newArr.forEach((n,i)=>{
    //     console.log(n);
    //     n=_.omit(n,['i']);
    //     console.log(n);
    // });
    newArr=_.map(newArr,(n,i)=>{
        n.start_time=n.c_time_range[0].format("YYYY-MM-DD");
        n.end_time=n.c_time_range[1].format("YYYY-MM-DD");
        return n=_.omit(n,['i','c_time_range']);
    })
    return newArr

}
