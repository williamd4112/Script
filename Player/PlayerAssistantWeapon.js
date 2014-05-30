#pragma strict
//IAN粒子來源
//開火速率
//武器火光
//武器開火音效
//GUI
var IAN_ParticleSource : GameObject ; 
var ProjectileSpeed : float = 200; 
var FireRate : float = 1; 
var GunSpark : GameObject[]; 
var GunAudio : AudioClip ; 
var GUI_CD :GUITexture;
//用以製作開火速率
//用以製作CD
//CD表原始數值
//是否過熱
private var  AllowFire : boolean = true ; 
private var GUI_CD_Origin : int ;
private var Overheat : boolean = false ;
function Start () {
GUI_CD_Origin =GUI_CD.guiTexture.pixelInset.height;

}

function Update () {
if(Input.GetButton("Jump") && Overheat==false)
{
  if(AllowFire)
  {
    Fire();
  }
}
//每個劃格檢查是否過熱
if(GUI_CD.guiTexture.pixelInset.height<=0)
{
  Overheat = true;
}
if(GUI_CD.guiTexture.pixelInset.height>=GUI_CD_Origin)
{
  Overheat = false;
}
//如果過熱就開始冷卻
if(GUI_CD.guiTexture.pixelInset.height<GUI_CD_Origin && Overheat)
GUI_CD.guiTexture.pixelInset.height= GUI_CD.guiTexture.pixelInset.height  + 1;

}


function Fire () {

    var IAN_Particle : GameObject = Instantiate(IAN_ParticleSource, transform.position,transform.rotation);
    for(var Spark in GunSpark )
    {
      Spark.SetActive(true);
    }
    
    if(GUI_CD.guiTexture.pixelInset.height>0)
    GUI_CD.guiTexture.pixelInset.height= GUI_CD.guiTexture.pixelInset.height  -30;
    
    audio.PlayOneShot(GunAudio);
	AllowFire = false ; 
	yield WaitForSeconds(FireRate);
	for(var Spark in GunSpark )
    {
      Spark.SetActive(false);
    }
	AllowFire = true ; 

}