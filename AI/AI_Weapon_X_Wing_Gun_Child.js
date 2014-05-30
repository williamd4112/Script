#pragma strict
/*NOTE : X Wing 是四管炮,此腳本存在於各砲管之中,而AI Behave由此四管炮的父級物件呼叫主開火函數(四管輪流開砲)*/

//主要武器變數
//武器音效
//武器火光來源
//子彈來源
//子彈速度
//開火速率
//開火開關(開火速率用)
var GunAudio : AudioClip ;
var GunSparkSource : GameObject ;
var ProjectileSource : Rigidbody ;
var ProjectileSpeed : float ;
var FireRate : float ;
private var AllowFire : boolean = true ;

function Start () {

}

function Update () {

}
//主要武器開火
function FireChild()
{
    //動態生成子彈
    if(AllowFire)
    {
       var Projectile : Rigidbody = Instantiate(ProjectileSource, gameObject.transform.position,gameObject.transform.rotation);
       //指定子彈的速度
       Projectile.velocity = transform.TransformDirection(Vector3( Random.Range(0, 8) , Random.Range(0, 8) , ProjectileSpeed ));
       //產生武器音效與火光
       audio.PlayOneShot(GunAudio);
       var GunSpark : GameObject = Instantiate(GunSparkSource, transform.position, transform.rotation);
    
    //開火開關關閉與開啟(控制速率)
	AllowFire = false ; 
	yield WaitForSeconds(FireRate);
	AllowFire = true ; 
	}

}