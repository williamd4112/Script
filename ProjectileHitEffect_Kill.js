#pragma strict

var DestroyTime : float = 0.1;


function Update () 
{
	Destroy(gameObject, DestroyTime);
}

function OnCollisionEnter (Target:Collision) {
     
     Destroy(gameObject, 0.001);

}