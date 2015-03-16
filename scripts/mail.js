$(document).ready(function() { // вс€ маги€ после загрузки страницы
	$(".ajaxform").submit(function(){ // перехватываем все при событии отправки
		var form = $(this); // запишем форму, чтобы потом не было проблем с this
		var error = false; // предварительно ошибок нет
		form.find('input, textarea').each( function(){ // пробежим по каждому полю в форме
			if ($(this).val() == '') { // если находим пустое
				alert('Enter field "'+$(this).attr('placeholder')+'"!'); // говорим заполн€й!
				error = true; // ошибка
			}
		});
		if (!error) { // если ошибки нет
			var data = form.serialize(); // подготавливаем данные
			$.ajax({ // инициализируем ajax запрос
			   type: 'POST', // отправл€ем в POST формате, можно GET
			   url: 'gogogo.php', // путь до обработчика, у нас он лежит в той же папке
			   dataType: 'json', // ответ ждем в json формате
			   data: data, // данные дл€ отправки
		       beforeSend: function(data) { // событие до отправки
		            form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
		          },
		       success: function(data){ // событие после удачного обращени€ к серверу и получени€ ответа
		       		if (data['error']) { // если обработчик вернул ошибку
		       			alert(data['error']); // покажем еЄ текст
		       		} else { // если все прошло ок
		       			alert('Mail has been send'); // пишем что все ок
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершени€ запроса к серверу
		            alert(xhr.status); // покажем ответ сервера
		            alert(thrownError); // и текст ошибки
		         },
		       complete: function(data) { // событие после любого исхода
		            form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
		         }
		                  
			     });
		}
		return false; // вырубаем стандартную отправку формы
	});
});