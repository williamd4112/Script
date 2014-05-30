#pragma strict
//AI Mind透過Sensor判斷是否有目標進入追擊範圍(不用Radar是因為與玩家的Radar不一樣,Sensor是感應以自身為中心的球體範圍,Radar是前方的球體範圍) , 並且依據由Sensor的偵測資料判斷而來的狀態來決定要從AI Behave存取什麼行為函數

//兩大主狀態  -  同時只能有一個開啟
//主狀態: 戰鬥 (非戰鬥即閒置)
var Combat : boolean = false ;

/*行為(Behvae)變數*/
//行為腳本
//由AttackArea指定
var Behave : AI_Behave ;
var isInAttackArea : boolean = false;
/*路徑(Path)變數*/
//路徑腳本
var PathFinding : AI_PathFinding ; 
/*Sensor 變數*/
//Sensor腳本
//目標列表
var Sensor : AI_Sensor ;
var Targetlist = new Array() ;
var SelectTarget : GameObject;


function Start()
{
//起始時指定AI需要存取的腳本
Behave = GetComponent(AI_Behave);
PathFinding = GetComponent(AI_PathFinding);
Sensor = GetComponentInChildren(AI_Sensor);
Sensor.User = gameObject;
}

function Update () {
//判斷只能有一個開啟
/*預留空間*/    
//*****************接收來自Sensor的資料判斷狀態 , 以及決定目標*****************//
//如果目標列表為空的,進入閒置狀態,有目標就進入戰鬥狀態
if( SelectTarget )
{
  Combat = true;
  //永遠指定陣列的第一個元素為目標  ( NOTE : 主要的功能只是BehaveTarget = Targetlist[0],其判斷式是為了防止物件突然被破壞)
  //如果第一個元素不是空的就指定給BehaveTarget(再寫一次Targetlist.length > 0是為了防止目標突然被摧毀)
  PathFinding.Target = SelectTarget;
   
}
else
{ 
  Combat = false;  
  SelectTarget = null; //未來為母艦
  PathFinding.Target = null; //未來為母艦  
}
//*****************由狀態判定要執行的行為 (目前僅有主狀態,主狀態下又有多個子狀態,例如:戰鬥>目標是否在射擊範圍)*****************//      
//如果是戰鬥狀態
if(Combat)
{
  //攻擊範圍內有敵人
    if(isInAttackArea)
    Behave.MainWeaponFire();
   
         
}
else
{
   //護航 , 無作為
}

}