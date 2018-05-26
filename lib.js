ga.lib.BulletSystem=function(){
	this.bullets=[];
	this.update=function(){
		if(ga.data.circle%3==0){ // �C 3 �^�X�[�J�@���l�u
			this.bullets.push(new ga.lib.Bullet());
		}
		// ��s�C�@���l�u
		for(var i=0;i<this.bullets.length;i++){
			if(this.bullets[i].update()){
				this.bullets.splice(i, 1);
				i--;
			}
		}
	};
	this.draw=function(){
		for(var i=0;i<this.bullets.length;i++){
			this.bullets[i].draw();
		}
	};
};
ga.lib.Bullet=function(){
	var seed=Math.random();
	if(seed>0.75){ // left to right 
		this.x=0;
		this.y=Math.random()*ga.ctx.canvas.height;
		this.vx=Math.random()*2+1; // 1~3
		this.vy=Math.random()*2-1; // -1 ~ 1
	}else if(seed>0.5){ // right to left 
		this.x=ga.ctx.canvas.width;
		this.y=Math.random()*ga.ctx.canvas.height;
		this.vx=Math.random()*2-3; // -1~-3
		this.vy=Math.random()*2-1; // -1 ~ 1
	}else if(seed>0.25){ // up to down 
		this.x=Math.random()*ga.ctx.canvas.width;
		this.y=0;
		this.vx=Math.random()*2-1; // -1~1
		this.vy=Math.random()*2+1; // 1 ~ 3
	}else{ // down to up  
		this.x=Math.random()*ga.ctx.canvas.width;
		this.y=ga.ctx.canvas.height;
		this.vx=Math.random()*2-1; // -1~1
		this.vy=Math.random()*2-3; // -1 ~ -3
	}
	this.size=1;
	this.update=function(){
		this.x+=this.vx;
		this.y+=this.vy;
		return this.x>ga.ctx.canvas.width||this.x<0||
			this.y>ga.ctx.canvas.height||this.y<0;
	};
	this.draw=function(){
		ga.ctx.save();
		ga.ctx.fillStyle="white";
		ga.ctx.beginPath();
		ga.ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		ga.ctx.fill();
		ga.ctx.restore();
	};
};
ga.lib.Plane=function(){
	this.x=ga.ctx.canvas.width/2;
	this.y=ga.ctx.canvas.height/2;
	this.size=24;
	this.speed=2;
	this.update=function(){
		var speed=this.speed;
		if(ga.keys.space){
			speed*=2;
		}
		if(ga.keys.left){
			this.x-=speed;
		}
		if(ga.keys.top){
			this.y-=speed;
		}
		if(ga.keys.right){
			this.x+=speed;
		}
		if(ga.keys.bottom){
			this.y+=speed;
		}
		return false;
	};
	this.draw=function(){
		ga.ctx.save(); // �x�sø�ϳ]�w
		var img;
		if(ga.keys.space){
			img=ga.res.imgs.explosion;
		}else{
			img=ga.res.imgs.plane;
		}
		ga.ctx.drawImage(img,
			this.x-this.size/2, this.y-this.size/2,
			this.size, this.size);
		ga.ctx.restore(); // ��_�W�@���x�s���]�w
	};
};



