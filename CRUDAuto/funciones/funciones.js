$(document).ready(() => {
	// alert("Hola desde JQUERY");
	llenadoTabla();

});

const llenadoTabla = () => {
	//Ajax --> No es un lenguaje y tampo un framework
	//Ajax es una metodologia que se ejecuta con javascript para programar asincronamente -> dividir las secciones de una pagina para que sean independientes

	//Carga total == 100%
	
	$.ajax({
		type: 'ajax',
		method: 'GET',
		url: 'http:localhost:7500/APIAUTO/listar',
		contentType: 'application/json; charset=UTF-8',
		success: (res) => {
			console.log('OK');
			console.log(JSON.stringify(res));

			var tr;
			for(var i = 0; i < res.length; i++) {
				tr +=	'<tr>' +
							'<td>' + res[i].id  + '</td>'+
							'<td>' + res[i].modelo  + '</td>'+
							'<td>' + res[i].marca  + '</td>'+
							'<td>' + res[i].precio  + '</td>'+
							'<td>' + res[i].color  + '</td>'+
							'<td><a class="btn btn-danger" data="'+res[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          			'<td><a class="btn btn-warning" data="'+res[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
						'</tr>'
			}
			$('#cuerpoTable').html(tr);
		},
		error: (err) => {
			console.log('BAD');
			console.log(err);
		}
	});
}

$('#cuerpoTable').on('click', '.btn-danger', function() {
	var id = $(this).attr('data');
	console.log("id->" + id);

	// $('#modalEditar').modal('show');

	var json = {"id": id};

	$.ajax({
		type: 'ajax',
		method: 'POST',
		url: 'http:localhost:7500/APIAUTO/buscar',
		data: JSON.stringify(json),
		contentType: 'application/json; charset=UTF-8',
		success: (res) => {
			console.log('OK');
			console.log(JSON.stringify(res));


			$('#modalEliminar').modal('show');

			$('#mensajeEliminar').html('Desea elimiar el registro con la siguiente información: <br> ID: ' +  id + '<br>Modelo: ' + res.modelo + '<br>Marca : ' + res.marca + '<br>Precio: ' + res.precio + '<br>Color: ' + res.color);

			var info = "";
			info  += '<p>ID: </p><p id="IDE">'+ id + '</p>'+
						'<p>MODELO: <p/><p id="MODELOE">'+ res.modelo + '</p>'+
						'<p>MARCA: <p/><p id="MARCAE">'+ res.marca + '</p>'+
						'<p>PRECIO: <p/><p id="PRECIOE">'+ res.precio + '</p>'+
						'<p>COLOR: <p/><p id="COLORE">'+ res.color + '</p>';

			$('#info').html(info)
			llenadoTabla();
		},
		error: (err) => {
			console.log('BAD');
			console.log(err);
		}
	});
});

$('#cuerpoTable').on('click', '.btn-warning', function() {
	var id = $(this).attr('data');
	console.log("id->" + id);

	// $('#modalEditar').modal('show');

	var json = {"id": id};

	$.ajax({
		type: 'ajax',
		method: 'POST',
		url: 'http:localhost:7500/APIAUTO/buscar',
		data: JSON.stringify(json),
		contentType: 'application/json; charset=UTF-8',
		success: (res) => {
			console.log('OK');
			console.log(JSON.stringify(res));

			$("#IDU").val(id);
			$("#MODELOU").val(res.modelo);
			$("#MARCAU").val(res.marca);
			$("#PRECIOU").val(res.precio);
			$("#COLORU").val(res.color);

			$('#modalEditar').modal('show');

			


		},
		error: (err) => {
			console.log('BAD');
			console.log(err);
		}
	});
});

$('#btnAbrirGuardar').click(() => {
	// console.log("Hola desde consola");

	$('#modalAlta').modal('show');

	var json = {};
});

$('#btnEliminar').click(() => {
	var id = $('#IDE').html();
	var modelo = $('#MODELOE').html();
	console.log(id);

	var json = {"id": id};

	$.ajax({
			type: 'ajax',
			method: 'POST',
			url: 'http:localhost:7500/APIAUTO/eliminar',
			data: JSON.stringify(json),
			contentType: 'application/json; charset=UTF-8',
			success: (res) => {
				console.log('OK');
				console.log(JSON.stringify(res));

				$("#modalEliminar").modal("hide");
				limpiar();
				$('.alert-danger').html('Se guardo el auto con el registro ' + modelo).fadeIn().delay(4000).fadeOut('snow')
				llenadoTabla();
			},
			error: (err) => {
				console.log('BAD');
				console.log(err);
			}
		});
});

$('#btnEditar').click(() => {
	// $('#modalAlta').modal('hide');

	var id = $("#IDU").val();
	var modelo = $("#MODELOU").val();
	var marca = $("#MARCAU").val();
	var precio = $("#PRECIOU").val();
	var color = $("#COLORU").val();

	console.log("id->"+id);
	console.log("modelo->"+modelo);
	console.log("marca->"+marca);
	console.log("precio->"+precio);
	console.log("color->"+color);

	if(id == '') {
		alert("Falta id");
	} else if(modelo == '') {
		alert("Falta modelo");
	} else if(marca == '') {
		alert("Falta marca");
	} else if(precio == '') {
		alert("Falta precio");
	} else if(color == '') {
		alert("Falta color");
	} else {
		// $("#modalAlta").modal("hide");
		// limpiar();
		// $('.alert-success').html('Se guardo el auto con el modelo ' + modelo).fadeIn().delay(4000).fadeOut('snow')
		var json = {"id": id, "modelo": modelo, "precio": precio, "marca": marca, "color": color};

		$.ajax({
			type: 'ajax',
			method: 'POST',
			url: 'http:localhost:7500/APIAUTO/guardar',
			data: JSON.stringify(json),
			contentType: 'application/json; charset=UTF-8',
			success: (res) => {
				console.log('OK');
				console.log(JSON.stringify(res));

				$("#modalEditar").modal("hide");
				limpiar();
				$('.alert-warning').html('Se guardo el auto con el modelo ' + modelo).fadeIn().delay(4000).fadeOut('snow')
				llenadoTabla();
			},
			error: (err) => {
				console.log('BAD');
				console.log(err);
			}
		});
	}
});

$('#btnGuardar').click(() => {
	// $('#modalAlta').modal('hide');

	var id = $("#ID").val();
	var modelo = $("#MODELO").val();
	var marca = $("#MARCA").val();
	var precio = $("#PRECIO").val();
	var color = $("#COLOR").val();

	console.log("id->"+id);
	console.log("modelo->"+modelo);
	console.log("marca->"+marca);
	console.log("precio->"+precio);
	console.log("color->"+color);

	if(id == '') {
		alert("Falta id");
	} else if(modelo == '') {
		alert("Falta modelo");
	} else if(marca == '') {
		alert("Falta marca");
	} else if(precio == '') {
		alert("Falta precio");
	} else if(color == '') {
		alert("Falta color");
	} else {
		// $("#modalAlta").modal("hide");
		// limpiar();
		// $('.alert-success').html('Se guardo el auto con el modelo ' + modelo).fadeIn().delay(4000).fadeOut('snow')
		var json = {"id": id, "modelo": modelo, "precio": precio, "marca": marca, "color": color};

		$.ajax({
			type: 'ajax',
			method: 'POST',
			url: 'http:localhost:7500/APIAUTO/guardar',
			data: JSON.stringify(json),
			contentType: 'application/json; charset=UTF-8',
			success: (res) => {
				console.log('OK');
				console.log(JSON.stringify(res));

				$("#modalAlta").modal("hide");
				limpiar();
				$('.alert-success').html('Se guardo el auto con el modelo ' + modelo).fadeIn().delay(4000).fadeOut('snow')
				llenadoTabla();
			},
			error: (err) => {
				console.log('BAD');
				console.log(err);
			}
		});
	}
});

const limpiar = () => {
	$("#ID").val('');
	$("#MODELO").val('');
	$("#MARCA").val('');
	$("#PRECIO").val('');
	$("#COLOR").val('');
}

// Como consumir servicios tipo rest con AJAX

