#pragma strict

var ProjectileSource : Rigidbody ; //子彈模板
var FireRate : float = 0.3; //開火速度
var ProjectileSpeed : float = 200; //子彈速度
var AllowFire : boolean = true ; //開火開關
var GunSparkSource : GameObject ; //武器火光
var GunAudio : AudioClip ; //武器音效
var SparkInitTransform : GameObject; //對準用
var CD_Bar :  Texture ; // 冷卻值表
var CD : int = 300 ; //冷卻值
var CD_Max : int = 300;//最大的冷卻值
var Overheat : boolean = false;//是否過日熱
var Fireing : boolean = false;//是否正在開火

function Start () {
    

}

function Update () {
   
   if(CD>=CD_Max)
   Overheat = false;
   //滑鼠左鍵 : 開火
   if(Input.GetButton("Fire1"))
   { 
     if(!Overheat)
     Fireing = true;
     
     if(AllowFire && CD>0 && Overheat==false)
     {  
       //開火
       CD = CD -1;
       Fire();
       var GunSpark : GameObject = Instantiate(GunSparkSource, transform.position, SparkInitTransform.transform.rotation);
       audio.PlayOneShot(GunAudio);
       if(CD<=0)
       Overheat = true;
   }
   }
   if(Input.GetButtonUp("Fire1"))
   Fireing = false;
  
   if(!Fireing)
   {
     if(CD<=CD_Max)
     CD = CD +1;
     
   } 
   


}

function Fire () {
   
    
    var Projectile : Rigidbody = Instantiate(ProjectileSource, transform.position,transform.rotation);
   
    Projectile.velocity = transform.TransformDirection(Vector3(ProjectileSpeed,Random.Range(0, 8), Random.Range(0, 8)));
	AllowFire = false ; 
	yield WaitForSeconds(FireRate);
	AllowFire = true ; 
    


}



@script RequireComponent(AudioSource)