cfg.Portrait // настройка портретного режима
error = false 
counted = false

class Main extends App
{

    onStart()
    {
       
        this.layMain = ui.addLayout( "main", "linear", "fillxy,vcenter" ) // главный макет
        this.layMain.setChildMargins( .02, .02, .02, .02 )

        this.tfd = ui.addTextField(this.layMain, "", "Outlined,Multiline", 0.9) // текстовое поле
        this.tfd.setRows(3, 10) // задаем строки
        this.tfd.disabled = true // отключаем ручное редактирование
        this.tfd.sizeVariant = "medium"
        this.layOne = ui.addLayout( this.layMain, "linear", "horizontal,fillx" ) // макет первой линии
        this.layOne.childSpacing = "even"
        this.layTwo = ui.addLayout( this.layMain, "linear", "horizontal,fillx" ) // макет второй линии
        this.layTwo.childSpacing = "even"
        this.layTree = ui.addLayout( this.layMain, "linear", "horizontal,fillx" ) // макет третьей линии
        this.layTree.childSpacing = "even"
        this.layFour = ui.addLayout( this.layMain, "linear", "horizontal,fillx" ) // макет четвертой линии
        this.layFour.childSpacing = "even"
        this.layFive = ui.addLayout( this.layMain, "linear", "horizontal,fillx" ) // макет пятой линии
        this.layFive.childSpacing = "even"
        
        // добавляем кнопки на макеты
        this.addButtons(["0", ".", "<-", "="], 5)
        this.addButtons(["1", "2", "3", "-"], 4)
        this.addButtons(["4", "5", "6", "+"], 3)
        this.addButtons(["7", "8", "9", "*"], 2)
        this.addButtons(["C", "(", ")", "÷"], 1)
    }
    
    // функция вывода символов и подсчета результата
    addSymbol(name){
      if(name == "÷") name = "/"
       var operators = ["+", "-", "*", "/", "."]
       if(operators.indexOf(name) !== -1){ // этот отрезок кода не даст поставить первым символом оператор и так же ставить операторы друг за другом, чтобы избежать ошибок
         var lastSymbol = this.tfd.text.split("\n")[0].slice(-1)
         if(operators.indexOf(lastSymbol) !== -1 || lastSymbol == ""){
           return;
         }
       }
      // если была ошибка или подсчет, при следующем вводе сбрасываем все символы
      if(this.error == true || this.counted == true){
        this.tfd.text = ""
        this.error = this.error ? false : false
        this.counted = this.counted ? false : false
      }
    
      if(name == "C"){ // если кнопка стереть, стираем
        this.tfd.text = ""
      } else if(name == "<-"){ // если кнопка удалить, удаляем
        this.tfd.text = this.tfd.text.split("\n")[0].slice(0, -1)
      } else if(name == "="){ // если кнопка равно, считаем
        if(this.tfd.text == ""){ // если поле ввода пусто, не считаем
          return;
        }
        var lastSymbol = this.tfd.text.split("\n")[0].slice(-1)
        if(operators.indexOf(lastSymbol) !== -1){ // если последний символ оператор, то не считаем
          return;
        }
        try{
          this.counted = true
          this.tfd.text = ""+eval(this.tfd.text.split("\n")[0])
        } catch(e){
          this.error = true
          this.tfd.text = e.message
        }
      } else { // любая другая кнопка добавляет символ в поле
        this.tfd.text = this.tfd.text.split("\n")[0] + name
        this.live()
      }
    }
    
    // отображение подсчета в режиме реального времени
    live(){
      try{
        let value = eval(this.tfd.text.split("\n")[0])
        this.tfd.text = this.tfd.text.split("\n")[0]+"\n\n"+value
      }catch(e){}
    }
    
    // функция добавления кнопки
    addButton(name, lay){
    	let lays = [this.layOne, this.layTwo, this.layTree, this.layFour, this.layFive]
    	this.btn = ui.addButton(lays[lay-1], name, "Outlined")
    	this.btn.setOnTouch(() => this.addSymbol(name))
   	 this.btn.sizeVariant = "large"
    }
    
    // функция добавления множества кнопок
    addButtons(names, lay){
    	names.forEach( name => this.addButton(name, lay) );
    }
}
