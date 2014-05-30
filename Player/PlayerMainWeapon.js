#pragma strict
//子彈來源
//子彈速度
//開火速率
//武器火光
//武器開火音效
//GUI
var ProjectileSource : Rigidbody ; 
var ProjectileSpeed : float = 200; 
var FireRate : float = 0.3; 
var GunSparkSource : GameObject ; 
var GunAudio : AudioClip ; 
var GUI_CD :GUITexture;
//用以製作開火速率
//用以製作CD
//CD表原始數值
//是否過熱
private var  AllowFire : boolean = true ; 
private var isFiring : boolean = false;
private var GUI_CD_Origin : int ;
private var Overheat : boolean = false ;

function Start () {
//設定原始數值
GUI_CD_Origin = GUI_CD.guiTexture.pixelInset.width;
}

function Update () {

isFiring = false;
if(Input.GetButton("Fire1") && !Overheat)
{
  if(AllowFire)
  {
    if(GUI_CD.guiTexture.pixelInset.width>0)
    GUI_CD.guiTexture.pixelInset.width= GUI_CD.guiTexture.pixelInset.width  -1;
    isFiring = true;
    Fire();
  }
}
//冷卻
else
{  
   if(GUI_CD.guiTexture.pixelInset.width<GUI_CD_Origin)
   GUI_CD.guiTexture.pixelInset.width= GUI_CD.guiTexture.pixelInset.width  + 1;
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


}


function Fire () {

    var Projectile : Rigidbody = Instantiate(ProjectileSource, transform.position,transform.rotation);
    var GunSpark : GameObject = Instantiate(GunSparkSource, transform.position,transform.rotation);
    Projectile.velocity = transform.TransformDirection(Vector3(Random.Range(0, 8), Random.Range(0, 8),ProjectileSpeed));
    
    audio.PlayOneShot(GunAudio);
	AllowFire = false ; 
	yield WaitForSeconds(FireRate);
	AllowFire = true ; 

}
