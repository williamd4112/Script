#pragma strict

var DestroyTime : float = 5;


function Update () 
{
	Destroy(gameObject, DestroyTime);
}
