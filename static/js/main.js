var FIGHT_CONFIG = {};
FIGHT_CONFIG.MAX_ATTACK = 300;
FIGHT_CONFIG.MAX_DEF = 200;
FIGHT_CONFIG.MAX_LUCK = 100;
FIGHT_CONFIG.MAX_SPEED = 100;
FIGHT_CONFIG.MAX_ACCURATELY = 100;
FIGHT_CONFIG.MAX_HP = 500;

FIGHT_CONFIG.FACTORY_LUCK = 30;
FIGHT_CONFIG.FACTORY_ACCURATELY = 20;

person = function() {

};

personRenrenFactory = function(personData)
{
	var newPerson = new person();

	newPerson.name = personData.name;
	newPerson.attack=(personData.blogCount+personData.pageCount)/300.0*FIGHT_CONFIG.MAX_ATTACK;
	newPerson.def=(personData.albumCount+personData.pageCount)/200.0*FIGHT_CONFIG.MAX_DEF;
	newPerson.lucky=personData.statusCount/2000*FIGHT_CONFIG.MAX_LUCK;
	newPerson.speed=personData.visitorCount/personData.albumCount/7;
	newPerson.accurately =  personData.visitorCount / personData.friendCount /10 * FIGHT_CONFIG.MAX_ACCURATELY;
	newPerson.maxHp=FIGHT_CONFIG.MAX_HP*(personData.pageCount+personData.friendCount+personData.visitorCount+personData.statusCount+personData.blogCount+personData.albumCount)/10000;
	newPerson.hp=newPerson.maxHp;
	newPerson.photo = personData.avatarAdd;

	newPerson.attack=parseInt(newPerson.attack);
	newPerson.def=parseInt(newPerson.def);
	newPerson.lucky=parseInt(newPerson.lucky);
	newPerson.speed=parseInt(newPerson.speed);
	newPerson.accurately = parseInt(newPerson.accurately);
	newPerson.maxHp=parseInt(newPerson.maxHp);
	newPerson.hp=newPerson.maxHp;

	if (newPerson.attack>=FIGHT_CONFIG.MAX_ATTACK) {newPerson.attack=FIGHT_CONFIG.MAX_ATTACK};
	if (newPerson.def>=FIGHT_CONFIG.MAX_DEF) {newPerson.def=FIGHT_CONFIG.MAX_DEF};
	if (newPerson.lucky>=FIGHT_CONFIG.MAX_LUCK) {newPerson.def=FIGHT_CONFIG.MAX_LUCK};
	if (newPerson.speed>=FIGHT_CONFIG.MAX_SPEED) {newPerson.def=FIGHT_CONFIG.MAX_SPEED};
	if (newPerson.accurately>=FIGHT_CONFIG.MAX_ACCURATELY) {newPerson.def=FIGHT_CONFIG.MAX_ACCURATELY};
	if (newPerson.maxHp>=FIGHT_CONFIG.MAX_HP) {newPerson.def=FIGHT_CONFIG.MAX_HP};
	return newPerson;
}

movement = function (attacker,defer) {
	var text = attacker.name + " 对 " + defer.name + "展开攻击,";
	var accurately = attacker.accurately * FIGHT_CONFIG.FACTORY_ACCURATELY / FIGHT_CONFIG.MAX_ACCURATELY*Math.random();
	var speed = attacker.speed / FIGHT_CONFIG.MAX_SPEED*Math.random();
	var miss = false;
	if (accurately<speed) miss = true;

	var attack = attacker.attack+(attacker.lucky*Math.random()*FIGHT_CONFIG.FACTORY_LUCK/FIGHT_CONFIG.MAX_LUCK);
	var def = defer.def+(defer.lucky*FIGHT_CONFIG.FACTORY_LUCK/FIGHT_CONFIG.MAX_LUCK*Math.random());
	var hurt = parseInt(attack - def);
	if(hurt<0)parseInt(hurt=10*Math.random());

	if (miss) 
		{			
			render([person1,person2],defer.name +"躲开了");
			setTimeout(function() {movement(defer,attacker)},300);
		}else
		{
			defer.hp -= hurt;
			if (defer.hp<=0) 
			{
				defer.hp=0;
				render([person1,person2],attacker.name +"获得了胜利");
			}else
			{
				render([person1,person2],defer.name +"收到了" + hurt +"的伤害");
				setTimeout(function() {movement(defer,attacker)},300);
			}
		}
}

render = function (persons,text) {
	var i=0;
	for(i=0;i< persons.length;i++)
	{

		$("#avatar-"+i).attr("src",persons[i].photo);
		$("#name-"+i).text(persons[i].name);
		$("#HP-"+i).text(persons[i].hp);
		$("#atk-"+i).text(persons[i].attack);
		$("#def-"+i).text(persons[i].def);
		$("#speed-"+i).text(persons[i].speed);
		$("#accurately-"+i).text(persons[i].accurately);
		$("#lucky-"+i).text(persons[i].lucky);
	}
	$("#fight").html($("#fight").html()+text+"<br>");
}

var person1=personRenrenFactory(person1Data);

var person2=personRenrenFactory(person2Data);

render([person1,person2],"准备战斗");