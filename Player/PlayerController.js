#pragma strict
//PlayerController : 戰機本體的主控台,其餘零件均有自己的輸入腳本(因為人類玩家可以鍵盤輸入,所以可以寫在零件,AI僅能以功能呼叫,所以寫在Behave腳本)
//角色攝影機
//前進速度
//轉向速度
//翻滾速度
//加速速度
//目標列表
//選定的目標
//顯示鎖定目標
//鎖定方框來源
//鎖定聲音
//引擎GUI
//引擎是否過熱
var ControlledCamera : Camera; 
var ForwardSpeed = 10;
var RotateSpeed = 0.2 ;
var RollSpeed = 100 ;
var BurstSpeed = 30;
var Targetlist = new Array();
var SelectTarget:GameObject;
var LockTab : GameObject;
var LockingSignSource: GameObject;
var LockingAudio : AudioClip ; 
var EngineGUI : GUITexture;
var Overheat : boolean = false;

//音效
//加速啟動音效
//持續加速音效
var BurstOneAudio : AudioClip ;
var BurstConstAudio : AudioClip ;
//慣性前進速度
//鎖定中的方框
//鎖定中方框螢幕位置
//受控制攝影機的腳本
//原始引擎GUI數值

private var ConstantForwardSpeed = 5;
private var LockingSign : GameObject ;
private var TargetScreenPos : Vector3 ;
private var ControlledCameraScript: PlayerCamera;
private var OriginEngineGUI:int;



function Awake () {

LockingSign = Instantiate(LockingSignSource, transform.position, transform.rotation);
LockingSign.SetActive(false);
//於一開始時生成鎖定中方框
LockingSign = Instantiate(LockingSignSource,transform.position,transform.rotation);

//設定攝影機腳本
ControlledCameraScript = ControlledCamera.GetComponent(PlayerCamera);

//設定原始引擎gui數值
OriginEngineGUI = EngineGUI.guiTexture.pixelInset.height;

}

function Update () {

      Screen.lockCursor = true ; //鎖定滑鼠
      /*視窗測試用部分*/
      if(Input.GetButtonDown =="escape")
      {
        Screen.lockCursor = false ; //鎖定滑鼠
      }
      Screen.showCursor = false;//隱藏游標 
      /*視窗測試用部分*/
      

//LockTab顯示
if(SelectTarget)
LockTab.guiText.text = SelectTarget.name;
else
LockTab.guiText.text = "NONE";
//LockingSign顯示
if(SelectTarget)
{
  LockingSign.SetActive(true);
  TargetScreenPos = ControlledCamera.WorldToViewportPoint(SelectTarget.transform.position);
  LockingSign.transform.position = TargetScreenPos;
}
else
{
  LockingSign.SetActive(false);
}


      
      
//慣性前進
transform.Translate(Vector3.forward * Time.deltaTime*ConstantForwardSpeed);
//W : 前進
if(Input.GetAxis("Vertical")>0)
{  
  Forward();
}
//S:剎車
//A,D : 轉向
if(Input.GetAxis ("Horizontal"))
{
  Rotate();
}
//滑鼠 : 翻轉
transform.Rotate(Vector3.forward * Time.deltaTime*Input.GetAxis("Mouse X")*RollSpeed);
transform.Rotate(Vector3.right * Time.deltaTime*Input.GetAxis("Mouse Y")*RollSpeed); 
//Shift : 加速
if(Input.GetButtonDown("Run") && !Overheat)
audio.PlayOneShot(BurstConstAudio);
if(Input.GetButton("Run")&&Input.GetAxis("Vertical")>0&& !Overheat)
{
  Burst();
  if(EngineGUI.guiTexture.pixelInset.height>0)
  EngineGUI.guiTexture.pixelInset.height = EngineGUI.guiTexture.pixelInset.height - 1;
  else
  Overheat = true;
  if(!audio.isPlaying)
  {     
    audio.PlayOneShot(BurstOneAudio); // 播放音效
  }
}
else
{
  if(EngineGUI.guiTexture.pixelInset.height<OriginEngineGUI)
  EngineGUI.guiTexture.pixelInset.height = EngineGUI.guiTexture.pixelInset.height + 1;
  else
  Overheat = false;
}
//空白建 : 切換目標
if(Input.GetButtonDown("Assistance"))
{
  RadarTarget();
}

}


//外部函式

//前進
function Forward(){
transform.Translate(Vector3.forward * Time.deltaTime*ForwardSpeed);
}
//剎車
function Brake(){
}
//轉向
function Rotate(){
transform.Rotate(0, Input.GetAxis ("Horizontal") * RotateSpeed, 0);
}
//翻滾
function Roll(){
//直接寫於主程式就好
}
//加速
function Burst(){
if(!Overheat)
transform.Translate(Vector3.forward * Time.deltaTime*BurstSpeed);
}
//切換飛彈雷達目標
function RadarTarget()
{
  //如果目標陣列的長度大於零
  if(Targetlist.length>0)
  { 
    if(Targetlist[0])
    {
      //宣告第一個目標
      //宣告第一個目標的腳本
      var FirstTarget : GameObject = Targetlist[0];
      var FirstTargetScript : EnemyDamageSystem = FirstTarget.GetComponent(EnemyDamageSystem) ;
      //檢查是否可鎖定(檢查是否在鎖定範圍內)
      if(FirstTargetScript.Lockable)
      {
        //複製第一個到最後,抽出第一個當選定目標
        //print("Lock");
        Targetlist.Push(Targetlist[0]);
        SelectTarget = Targetlist.Shift();
       
      }
      //如果不可鎖定
      else
      {
        //如果第一個目標不可鎖定,就移除第一個目標讓後面的目標遞補到第一個直到可以鎖定為止
        for(var i = 1 ; i <= Targetlist.length ; i++)
        {
          //先抽走一個目標
          Targetlist.Shift();
          //如果判斷到最後一個都沒有可鎖定的目標的時候就顯示no target , 沒有就繼續判斷
          if(Targetlist.length>0)
          {  
            FirstTarget = Targetlist[0];
            if(FirstTarget)
            {
               FirstTargetScript  = FirstTarget.GetComponent(EnemyDamageSystem) ;
               if(FirstTargetScript.Lockable)
               {
                 //如果往後掃描到可以鎖定的目標就執行正常的程序把目標放入選定的目標當中
                 //複製第一個到最後,抽出第一個當選定目標
                 //print("Lock");
                 Targetlist.Push(Targetlist[0]);
                 SelectTarget = Targetlist.Shift();
               }
            } 
          } 
          else
          {
            //print("NoTargetInLine");
            SelectTarget = null;
           
          } 
 
        }
      } 
    }
    else
    {
       Targetlist.Shift();
    }  
    
 }
 //如果目標陣列小於0
 else
 {
   //print("len<0");
   SelectTarget = null;
 }

 
}
//釋放IAN粒子
function IAN()
{


}

//碰撞後自動穩定
function OnCollisionExit (Hit : Collision)
{
   yield WaitForSeconds(0.5);
   rigidbody.angularVelocity = Vector3.zero;
   rigidbody.velocity = Vector3.zero;
   
}

//命中後效果
function OnCollisionEnter (Hit : Collision)
{
   
   ControlledCameraScript.Hit();
   
}


