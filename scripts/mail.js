$(document).ready(function() { // ��� ����� ����� �������� ��������
	$(".ajaxform").submit(function(){ // ������������� ��� ��� ������� ��������
		var form = $(this); // ������� �����, ����� ����� �� ���� ������� � this
		var error = false; // �������������� ������ ���
		form.find('input, textarea').each( function(){ // �������� �� ������� ���� � �����
			if ($(this).val() == '') { // ���� ������� ������
				alert('Enter field "'+$(this).attr('placeholder')+'"!'); // ������� ��������!
				error = true; // ������
			}
		});
		if (!error) { // ���� ������ ���
			var data = form.serialize(); // �������������� ������
			$.ajax({ // �������������� ajax ������
			   type: 'POST', // ���������� � POST �������, ����� GET
			   url: 'gogogo.php', // ���� �� �����������, � ��� �� ����� � ��� �� �����
			   dataType: 'json', // ����� ���� � json �������
			   data: data, // ������ ��� ��������
		       beforeSend: function(data) { // ������� �� ��������
		            form.find('input[type="submit"]').attr('disabled', 'disabled'); // ��������, �������� ������, ����� �� ���� �� 100 ���
		          },
		       success: function(data){ // ������� ����� �������� ��������� � ������� � ��������� ������
		       		if (data['error']) { // ���� ���������� ������ ������
		       			alert(data['error']); // ������� � �����
		       		} else { // ���� ��� ������ ��
		       			alert('Mail has been send'); // ����� ��� ��� ��
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) { // � ������ ���������� ���������� ������� � �������
		            alert(xhr.status); // ������� ����� �������
		            alert(thrownError); // � ����� ������
		         },
		       complete: function(data) { // ������� ����� ������ ������
		            form.find('input[type="submit"]').prop('disabled', false); // � ����� ������ ������� ������ �������
		         }
		                  
			     });
		}
		return false; // �������� ����������� �������� �����
	});
});