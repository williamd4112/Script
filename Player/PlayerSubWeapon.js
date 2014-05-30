#pragma strict
//子彈模板
//開火速度
//武器火光
//武器音效
//搭載者
//GUI
var ProjectileSource : Rigidbody ; 
var FireRate : float = 0.3; 
var GunSparkSource : GameObject ; 
var GunAudio : AudioClip ; 
var User : GameObject;
var GUI_CD :GUITexture;
//用以製作開火速率 
//用以製作CD
//CD表原始數值
//是否過熱
private var AllowFire : boolean = true ; 
//private var isFiring : boolean = false;
private var GUI_CD_Origin : int ;
private var Overheat : boolean = false ;

function Start () {
//設定原始數值
GUI_CD_Origin = GUI_CD.guiTexture.pixelInset.width;
}

function Update () {
  
if(Input.GetButton("Fire2") && !Overheat)
{
  if(AllowFire)
  {
    Fire();
  }
}
//每個劃格檢查是否過熱
if(GUI_CD.guiTexture.pixelInset.width<=0)
{
  Overheat = true;

  
}
if(GUI_CD.guiTexture.pixelInset.width>=GUI_CD_Origin)
{
  Overheat = false;
}
//如果過熱就開始冷卻
if(GUI_CD.guiTexture.pixelInset.width<GUI_CD_Origin && Overheat)
GUI_CD.guiTexture.pixelInset.width= GUI_CD.guiTexture.pixelInset.width  + 1;
}

function Fire () {
    
    //搭載者的腳本
    var UserScript = User.GetComponent(PlayerController);
    //判斷是否有目標
    if(UserScript.SelectTarget)
    {
      //飛彈-複製
      //飛彈的腳本
      //開火效果-複製
      var Projectile : Rigidbody = Instantiate(ProjectileSource, transform.position, transform.rotation);
      var ProjectileScript = Projectile.gameObject.GetComponent(MissileTrack);
      var GunSpark : GameObject = Instantiate(GunSparkSource, transform.position,transform.rotation);
      
      //播放開火音效
      audio.PlayOneShot(GunAudio);
      
      //減少飛彈的數量
      if(GUI_CD.guiTexture.pixelInset.width>0)
      GUI_CD.guiTexture.pixelInset.width= GUI_CD.guiTexture.pixelInset.width  -90;
    
      //把搭載者決定的目標設定給飛彈
      ProjectileScript.Target = UserScript.SelectTarget;
	
	  //關閉開火,等CD時間過後再開
	  AllowFire = false ; 
	  yield WaitForSeconds(FireRate);
	  AllowFire = true ;
	}

}

@script RequireComponent(AudioSource)
