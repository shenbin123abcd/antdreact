
export default function(n,i) {
    // console.log(key);
    var branch_shop_name=n.branch_shop_name;
    if(n.branch_shop_name){
        branch_shop_name=` - ${n.branch_shop_name}`;
    }
    return (
        <div key={i}>{n.main_shop_name}{branch_shop_name}</div>
    )
}
