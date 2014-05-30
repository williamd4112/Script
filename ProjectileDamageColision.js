#pragma strict
var HitSound : AudioClip; // 命中音效
var HitEffectSource : GameObject; //命中特效模板


function Start () {

}

function OnCollisionEnter (Target:Collision) 
{
    
      var HitEffect : GameObject = Instantiate(HitEffectSource, transform.position, transform.rotation);
      Destroy(gameObject, 0.01);
      audio.PlayOneShot(HitSound);
    
}