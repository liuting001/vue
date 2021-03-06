
// 选项卡轮播（abtn--选项；abox--显示区域）
// 选项卡复原
    var nowindex =0;
    function recover(abtn,abox){
        for(var n=0; n<abtn.length; n++){
        abtn[n].style.backgroundColor = 'gray';
        abox[n].style.display = 'none';
        }
    }

//选项卡自动播放 
    function autoplay(abtn,abox){
        timer = setInterval(() => {
            recover(abtn,abox);
            nowindex = nowindex % abtn.length;
            abtn[nowindex].style.backgroundColor = 'red';
            abox[nowindex].style.display = 'block';
            nowindex++;
        }, 1000);
    }

// 初始化
    function initialize(abtn,abox){
        for(var i=0; i<abtn.length; i++){
            abtn[i].index = i;
            abtn[i].onmouseover = function(){
                clearInterval(timer);
                recover(abtn,abox);
                abtn[this.index].style.backgroundColor = 'red'
                abox[this.index].style.display = 'block';
            }
            abtn[i].onmouseout = function(){
                nowindex = this.index + 1;
                autoplay();
            }  
        }
    }

// 获取目标样式
    function getStyle(obj, attr){ 
        return window.getComputedStyle ? getComputedStyle(obj)[attr]: obj.currentStyle[attr] 
    }

// 目标匀速移动（box--目标元素；step--步长；target--目标值；derection--移动方向；speed--移速间隔时间；callback--回调函数）
    function mover(box){
        this.timer = 0;
        this.box = box;
    }
    function callback(){
        var newMover = new mover(obox);
        newMover.move(-21,100,'left',100);
    }
    mover.prototype.move = function(step,target,derection,speed,callback){
        var timer = this.timer;
        var box = this.box;
        clearInterval(timer);
        timer = setInterval(() => {
            var n = parseInt( getStyle(box,derection)) + step;
            if((step>0 && n>target) || (step<0 && n<target)){
                clearInterval(timer);
                n = target;
            }
            box.style[derection] = n + 'px';
            if(n == target){
                callback && callback();
            }      
        }, speed);   
    }

// 事件绑定（addEventlistener）
    function addEvent(obj, type, fn){ 
        if(obj.addEventListener){ 
            obj.addEventListener(type, fn, false); 
        }else if(obj.attachEvent){ 
            obj.attachEvent('on' + type, fn); 
        }else{ 
            obj['on' + type] = fn; 
        } 
    }
// 事件取消
    function removeEvent(obj, type, fn){ 
        if(obj.removeEventListener){ 
            obj.removeEventListener(type, fn, false); 
        }else if(obj.detachEvent){ 
            obj.detachEvent('on' + type, fn); 
        }else{ 
            obj['on' + type] = null; 
        } 
    } 
// 随机获取整数,生成一个n-m之间的随机整数
    function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min)}

//10进制的num转换成radix(2-16)进制的数。
    function conversion(num,radix){
        var map = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
        var arr = [];
        var item;//记录余数
        while(num != 0){
            item = num % radix;
            num = (num - item)/radix;//记录整除数，赋值给num，继续取余。
            arr.unshift(map[item]);
        }
        return arr.join('');       
    }