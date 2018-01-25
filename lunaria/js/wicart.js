/***************************************
 * JQuery based script					
 * Basket on client side 				
 * Created WebInside WebStudio (c) 2014	
 * Use only for linked www.webinside.ru 
 **************************************/

var local = 	{
			"basket_is_empty" : "", 
			"name" : "Название",
			"price" : "Цена",
			"all" : "Всего",
			"order" : "Оформить заказ",
			"basket" : "корзина",
			"num" : "кол-во",
			"send" : "Спасибо за покупку!\nМы свяжемся с Вами в ближайшее время",
			"goods" : "Товаров",
			"amount" : "на сумму"
			};
 
function WICard(obj, plugins)
	{
	this.widjetX = 0;
	this.widjetY = 0;	
	this.widjetObj;
	this.widjetPos;
	this.cardID = "";
	this.DATA = {};
	this.IDS = [];
	this.objNAME = obj;
	this.CONFIG = {};
	this.IMG = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABpFBMVEUAAABEREBEREBEREBEREASEhEJCQgGBgYBAQEAAAAGBgUHBwYAAAAAAAADAwNEREBEREAJCQkICAcGBgYFBQUJCQgnJyVEREAICAgBAQEAAAAICAcAAAAAAAAAAAAJCQgAAAAGBgYBAQEQEA8NDQwHBwcBAQEMDAsSEhEJCQkBAQEBAQEBAQFAQDxEREBEREADAwIAAAABAQESEhEkJCIAAAAICAgAAAAQEA9EREAAAAATExIAAAAKCgkNDQwAAAAAAAABAQETExIHBwcDAwMDAwMTExIAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAADAwIAAAAGBgUBAQEWFhUAAAAAAAAHBwYBAQEVFRMDAwMHBwcUFBMWFhUBAQETExIAAAAAAAADAwMMDAsAAAAAAAASEhEAAAAUFBMAAAAJCQkrKygDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAJCQgAAAAiIiABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQFEREAFBQUBAQEAAAAGBgYICAgHBwcBAQEJW8x2AAAAhXRSTlMAAQcIAjJ0kZqZnp+LaygNDxKw/v6wIwPY1A+upf4nenGWvXCg/Pubc8eSmLkcHxpW+vlhBr6hl3EDUl9pop5Q+fhe+1FPXVT8mlxfXWD9+1dbnPRRRved9ldI+Fhd+mBaVlSYWJN1V2dqwwVTA8ORvJXAknRzKii2rCjc3BUTqagrepgUbRZwswAAAAlwSFlzAAAASAAAAEgARslrPgAAAb1JREFUOMuNk2dTwkAQhpdiCZagotiwd5RYQeyKJdii2FDsvffeG0TJnza3lzg4kBnv0zt5NpvdZ3IA/zs6vUGv00wAxrj4hESGnERTkomk5JRU1swaFZ6WnhEMieSEgl9qsmRmWVWe/R2W8KkUjkw5uUr/vNhcEvPpLHEZGly0FYA8pb4wqMFFscioBzAU06lKSsvKKa+orKqmqYY1yB3smGvrHFx9A0mNTQ6uuQU7Oc1yB50Lc6uDc0ObXNHYTlIHfqmTJaZcmLvkpwDdPb19hAODkzjRlAuzpx93GhhEPsTjpF6gBTg1PyxnN4d8hHKJoQUhuhU/qvKxcWVTWmAPKlsLE5RP8qoJLND5vhQ/U9PIYWZWNcWgyTnFpH+ecoCFgNKTQZM+atK/qHI3txSg73gjTC6vIF9dw0nXhSiTG8g3eaEeJ92KMrlN+I4gSp5dkvaiTO4fAKwJ6PQQ4Og4wuQJ3fp070zZXzhJOafpAgsuQ2Gtf+4KC64tWtx2gybZW61/8g7QpPn+ITZ/fAI0yVqfX2wx+r8+gxVNkl3f3j+cnU4v3j4vSa73NwDrJ5qkt+f3Jv5N6u3Vvt0/UGcpYbC85ecAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDUtMThUMDY6MDM6MzEtMDU6MDALk1CfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTA1LTE4VDA2OjAzOjMxLTA1OjAwes7oIwAAAABJRU5ErkJggg==";
	
	
	this.init = function(widjetID, config)
		{
		this.CONFIG = config || {};
		try {
			this.DATA = JSON.parse(localStorage.getItem(widjetID)); 
			if ($.isEmptyObject(this.DATA))
				{
				this.DATA = {};
				}	
			} 
			catch (e) 
			{
			this.DATA = {};
			}	
		try  {
			this.IDS = JSON.parse(localStorage.getItem(widjetID + "_ids"));
			if ($.isEmptyObject(this.IDS))
				{
				this.IDS = [];
				}	
			} 
			catch (e) 
			{
			this.IDS = [];
			}	
		
		this.cardID = widjetID;	
		
		this.widjetObj = $('[data-cart]');
			
		
		if ($.isEmptyObject(this.DATA))
			{
			this.widjetObj.find('span').html(local.basket_is_empty);
            $('#bcontainer').html('<div class="cell">Корзина пуста</div>');
            }
			else
			{
			this.reCalc();	
			this.renderBasketTable();
			}
		
		}
		
/***********************************************************************************************
 * example: onclick="cart.addToCart(this, '2', 'Name of comic 2', '25500')						
 **********************************************************************************************/
	this.addToCart = function(curObj, id, params)
		{
		var kol = 1;
		
		if ( $("input").is("#" + wiNumInputPrefID + id) )
			{
			kol = parseInt( $("#" + wiNumInputPrefID + id).val() );	
			}
				
		id = ( $.isNumeric(id) ) ? "ID" + id.toString() : id;
		
		var id_ = ( $.isEmptyObject(params.subid) ) ? id : id + "_" + params.subid;
		
		 
		var goodieLine = {"id" : id_, "name" : params.name, "price": params.price, "num" : kol, "url" : params.url, "photo" : ""};
		
		if ($.isEmptyObject(this.DATA))
			{
			this.DATA[id_] = goodieLine;	
			this.IDS.push(id_);
			}
		else
		for(var idkey in this.DATA) 
			{
			
			
			if($.inArray(id_, this.IDS) === -1)
				{
				this.DATA[id_] = goodieLine;
				this.IDS.push(id_)
				
				}
			else	
			if (idkey == id_)
				{
				
				this.DATA[idkey].num += kol;	
				
				}
			}
		
		localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
		localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
		this.reCalc();
		
		this.renderBasketTable();
		
		if (this.CONFIG.showAfterAdd)
			{
			cart.showWinow('bcontainer', 1);
			}
		}
	this.reCalc = function()
		{
		var num = 0;
		var sum = 0; 	
		for(var idkey in this.DATA) 
			{
			num += parseInt(this.DATA[idkey].num);
			sum += parseFloat(parseInt(this.DATA[idkey].num) * parseFloat(this.DATA[idkey].price));
			}
			
		// *** currency plugin *** //
		
		if (typeof WICartConvert == 'function' )
				{
				sum = WICartConvert(sum);
				}
				
		// *** //		 		
		this.widjetObj.find('span').html(num);
		localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
		if ($.isEmptyObject(this.DATA)) {
            $('#bcontainer').html('<div class="cell">Корзина пуста</div>');
        };
        }
        
	this.clearBasket = function()
		{
		this.DATA = {};	
		this.IDS = [];
		this.widjetObj.find('span').html(local.basket_is_empty);	
		localStorage.setItem(this.cardID, "{}");
		localStorage.setItem(this.cardID + "_ids", "[]");
		$('#bcontainer').html('<div class="cell">Благодарим за оформление заказа!<br>Копия заказа отправлена по указанному Email.<br>Мы позвоним Вам в течение дня.</div>');
        }	
	this.renderBasketTable = function()
		{
		
		if ($('#bcontainer').length == 0) return false;
			/*		
			$("body").append(" \
				<div id='blindLayer' class='blindLayer'></div> \
				<div id='bcontainer' class='bcontainer'> \
				<div id='bsubject'>" + local.basket + "<a id='bclose' href='#' onclick='" + this.objNAME + ".closeWindow(\"bcontainer\", 1);'><img src='data:image/jpeg;base64,"+ this.IMG + "' /></a></div> \
				<table id='bcaption'><tr><td>ID</td><td>" + local.name + "</td><td>" + local.price + "</td><td>" + local.num + "</td><td>" + local.all + "</td><td></td></tr></table> \
				<div id='overflw'><table class='btable' id='btable'></table></div> \
				<div id='bfooter'> <button class='bbutton' onclick=\"cart.showWinow('order', 1)\">" + local.order + "</button><span id='bsum'>...</span></div> \
				</div> \
			");*/	
		if ($.isEmptyObject(this.DATA)) {
            $('#bcontainer').html('<div class="cell">Корзина пуста</div>');
            return false;
        };
		$("#btable").html("");	
		
		for(var idkey in this.DATA) 
			{
				
			with (this.DATA[idkey])
				{
				var productLine = '<tr class="bitem" id="wigoodline-' + id + '"> \
													<td><a href="' + url + '">' + photo + name +'</a></td> \
													<td id="lineprice_' + id + '"class="wigoodprice">' + price + ' ₽</td> \
													<td>&times;</td> \
                                                    <td> \
													<div class="text-center"><span class="basket_num_buttons" id="minus_' + id + '">–</span></div> \
													<span class="basket_num" id="basket_num_' + id + '">'+ num +'</span> \
													<div class="text-center"><span class="basket_num_buttons" id="plus_' + id + '">+</span></div></td> \
													<td>=</td> \
                                                    <td id="linesum_' + id + '">'+ parseFloat(price * num) +' ₽</td> \
													<td><div class="basket_num_buttons" style="background-color: gray;" onclick="' + this.objNAME + '.delItem(\'' + id + '\')">&times;</div></td> \
													</tr>';	
				}
			$("#btable").append(productLine);
			
			$(".basket_num_buttons").data("min-value");
			}
		//* кнопки +/-
		var self = this;
		for(var ids in this.IDS)
			{
			$('#minus_' + this.IDS[ids]).bind("click", function() {
			var cartItemID =  $(this).attr("id").substr(6);
			var cartNum = parseInt($("#basket_num_" + cartItemID).text());
			var cartNum = (cartNum > 1) ? cartNum - 1 : 1;
			self.DATA[cartItemID].num = cartNum;
			
			$("#basket_num_" + cartItemID).html(cartNum);
			var price = parseFloat( $("#lineprice_" + cartItemID).html() );
			$("#linesum_" + cartItemID).html( parseFloat(price * cartNum) + ' ₽' );
			
			self.sumAll();
			
			self.reCalc();
			
			});
			
			$('#plus_' + this.IDS[ids]).bind("click", function() {
			var cartItemID =  $(this).attr("id").substr(5);
			var cartNum = parseInt($("#basket_num_" + cartItemID).text());
			var cartNum = (cartNum < 1000000) ? cartNum + 1 : 1000000;
			self.DATA[cartItemID].num = cartNum;
			$("#basket_num_" + cartItemID).html(cartNum);
			var price = parseFloat( $("#lineprice_" + cartItemID).html() );
			$("#linesum_" + cartItemID).html( parseFloat(price * cartNum)  + ' ₽' );
			
			self.sumAll();
			self.reCalc();
			
			});
			
			}
		this.sumAll();	
		
		}
	this.sumAll = function()
		{
		var sum = 0;
		for(var idkey in this.DATA) { sum += parseFloat(this.DATA[idkey].price * this.DATA[idkey].num); }
		$("#bsum").html(sum + " ₽");	
		}	
	this.showWinow = function(win, blind)
		{
		$("#" + win).show();
		if (blind)
		$("#blindLayer").show();	
		}
	this.closeWindow = function(win, blind)
		{
		$("#" + win).hide();
		if (blind)
		$("#blindLayer").hide();	
		}
	this.delItem = function(id)
		
			{
			$("#btable").html("");	
			delete this.DATA[id];
			this.IDS.splice( $.inArray(id, this.IDS), 1 );
			this.reCalc();
			this.renderBasketTable();
			localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
			localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
			if (this.IDS.length == 0)
			this.widjetObj.find('span').html(local.basket_is_empty);	
			} 
		
	this.sendOrder = function(domElm)	
		{
		var bodyHTML = "";
		var arr = domElm.split(",");
		
		for (var f=0; f < arr.length; f++) {
		
			bodyHTML +=  this.getForm(arr[f]) + "<br><br>";	
			
			};
		$.post( 'lunaria/php/sendbasket.php?subj=Новый заказ&email=' + $('#email').val(), { "order": bodyHTML }).done(function( data ) {
		
            cart.clearBasket();
		});
		
		}
	this.getForm = function (formId)
		{
		var formObj = document.getElementById(formId);
		var copyForm = formObj.cloneNode(true);
		
		INPUTS=[].slice.call( copyForm.querySelectorAll("input, textarea, select") );
	
		INPUTS.forEach(function(elm)
			{
			if  ( (elm.tagName == 'INPUT') && ((elm.type == 'text') || (elm.type == 'hidden')) )	
					{	
					var spanReplace = document.createElement("div");
					spanReplace.innerHTML = elm.value;	
					elm.parentNode.replaceChild(spanReplace, elm);	
					}
			else 
			if (elm.tagName == 'TEXTAREA')
					{
					var spanReplace = document.createElement("div");
					spanReplace.innerHTML = $("#" + elm.id).val();	
					elm.parentNode.replaceChild(spanReplace, elm);		
					}
			else
            if (elm.tagName == 'SELECT')
					{
					var spanReplace = document.createElement("div");
					spanReplace.innerHTML = $("#" + elm.id).val();
					elm.parentNode.replaceChild(spanReplace, elm);		
					}
			});
	return copyForm.innerHTML;
		}
	}
	
function sendOrder(event) {
    event.preventDefault();
    cart.sendOrder('formToSend,goodsList');
    return false;
}