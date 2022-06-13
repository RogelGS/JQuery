$("document").ready(() => {
	getTable();
	fillSelect();
});

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/COMPUTADORAAPI/listar",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla +=	'<tr>' +
										'<td>' + res[i].id + '</td>' +
										'<td>' + res[i].modelo + '</td>' +
										'<td>' + res[i].marca.nombre + '</td>' +
										'<td>' + res[i].precio + '</td>' +
										'<td>' + res[i].ram + '</td>' +
										'<td><a class="btn btn-danger" data="'+res[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          			'<td><a class="btn btn-warning" data="'+res[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
									'</tr>'
			}
			$('#tabla').html(tabla);
		},
		error: (err) => {
			console.log(err);
		}
	});
}


$("#btnModalGuardar").click(() => {
	$("#modalGuardar").modal("show");
});

const fillSelect = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/MARCAAPI/listar",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion;

			opcion +=	'<option value="">Seleccione una MARCA</option>';
			for(var i = 0; i < res.length; i++) {
				opcion +=	'<option value="'+ res[i].id +'">' + res[i].nombre + '</option>';
			}
			$('#MARCAG').html(opcion);
			$('#MARCAE').html(opcion);
		},
		error: (err) => {
			console.log(err);
		}
	});
}


$("#btnGuardar").click(() => {
	var id = $("#IDG").val();
	var modelo = $("#MODELOG").val();
	var marca = $("#MARCAG option:selected").val();
	var precio = $("#PRECIOG").val();
	var ram = $("#RAMG").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(modelo == "") {
		alert("FALTA MODELO");
	} else if(marca == "") {
		alert("FALTA MARCA");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(ram == "") {
		alert("FALTA RAM");
	} else {
		var json = {"id": id, "modelo": modelo, "marca" : { "id" : marca }, "precio": precio, "ram": ram};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/COMPUTADORAAPI/guardar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalGuardar").modal("hide");
				clear();
				$('.alert-success').html('Se guardo la COMPUTADORA con el MODELO ' + modelo).fadeIn().delay(4000).fadeOut('snow');
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});


$("#tabla").on("click", ".btn-warning", function() {
	var id = $(this).attr('data');

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/COMPUTADORAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			
			$('#IDE').val(id);
			$('#MODELOE').val(res.modelo);
			$('#MARCAE').val(res.marca.id);
			$('#PRECIOE').val(res.precio);
			$('#RAME').val(res.ram);

			$("#modalEditar").modal("show");
		},
		error: (err) => {
			console.log(err);
		}
	});
});

$("#btnEditar").click(() => {
	var id = $("#IDE").val();
	var modelo = $("#MODELOE").val();
	var marca = $("#MARCAE option:selected").val();
	var precio = $("#PRECIOE").val();
	var ram = $("#RAME").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(modelo == "") {
		alert("FALTA MODELO");
	} else if(marca == "") {
		alert("FALTA MARCA");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(ram == "") {
		alert("FALTA RAM");
	} else {
		var json = {"id": id, "modelo": modelo, "marca" : { "id" : marca }, "precio": precio, "ram": ram};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/COMPUTADORAAPI/editar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalEditar").modal("hide");
				clear();
				$('.alert-success').html('Se edito la COMPUTADORA con el MODELO ' + modelo).fadeIn().delay(4000).fadeOut('snow');
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});


$("#tabla").on("click", ".btn-danger", function() {
	var id = $(this).attr('data');

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/COMPUTADORAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");
			
			var info = "";
			info +=	'<div class="box-body">' +
              '<dl class="dl-horizontal">' +
                '<dt>ID de la COMPUTADORA:</dt>' +
                '<dd id="IDEL">' + id + '</dd>' +
                '<dt>MODELO de la COMPUTADORA:</dt>' +
                '<dd id="MODELOEL">' + res.modelo + '</dd>' +
                '<dt>NOMBRE de la MARCA:</dd>' +
                '<dd id="MARCAEL">' + res.marca.nombre + '</dt>' +
                '<dt>PRECIO de la COMPUTADORA:</dd>' +
                '<dd id="PRECIOEL">' + res.precio + '</dt>' +
                '<dt>RAM de la COMPUTADORA:</dd>' +
                '<dd id="RAMEL">' + res.ram + '</dt>' +
              '</dl>' +
            '</div>';

            $("#info").html(info);
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});

$("#btnEliminar").click(() => {
	var id = $("#IDEL").html();
	var nombre = $("#MODELOEL").html();

	var json = {"id" : id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/COMPUTADORAAPI/eliminar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$('.alert-danger').html('Se elimino el registro con el nombre ' + nombre).fadeIn().delay(4000).fadeOut('snow')
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});

const clear = () => {
	$("#IDG").val("");
	$("#MODELOG").val("");
	$("#MARCAG").val("");
	$("#PRECIOG").val("");
	$("#RAMG").val("");
}