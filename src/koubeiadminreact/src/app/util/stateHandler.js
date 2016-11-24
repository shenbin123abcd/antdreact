
export default function(str) {
    switch (str){
        case '0':
            return '已下架';
            break;
        case '1':
            return '已上架';
            break;
        case '2':
            return '冻结';
            break;
    }
}
