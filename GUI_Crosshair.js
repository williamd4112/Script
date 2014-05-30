#pragma strict
var target : Transform; 
var SourceCamera : Camera;

 

function Update () 

{ 
     if(target)
     {
     var wantedPos: Vector3 =  SourceCamera.WorldToViewportPoint (target.position); 
     transform.position = wantedPos; 
     }
     else
     {
     guiTexture.active = false;
     }
      
}