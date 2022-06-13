$("document").ready(() => {
	getTable();
});

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/MARCAAPI/listar",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla +=	'<tr>' +
										'<td>' + res[i].id + '</td>' +
										'<td>' + res[i].nombre + '</td>' +
										'<td>' + res[i].pais + '</td>' +
										'<td><a class="btn btn-danger" data="'+res[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          			'<td><a class="btn btn-warning" data="'+res[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
		          			'<td><a class="btn btn-success" data="'+res[i].id+'"><i class="fa fa-fw fa-th-list"></i></a></td>'+
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


$("#btnGuardar").click(() => {
	var id = $("#IDG").val();
	var nombre = $("#NOMBREG").val();
	var pais = $("#PAISG").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(pais == "") {
		alert("FALTA PAIS");
	} else {
		var json = {"id": id, "nombre": nombre, "pais": pais};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/MARCAAPI/guardar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalGuardar").modal("hide");
				clear();
				$('.alert-success').html('Se guardo la MARCA con el NOMBRE ' + nombre).fadeIn().delay(4000).fadeOut('snow');
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
		url: "http:localhost:7500/MARCAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			
			$('#IDE').val(id);
			$('#NOMBREE').val(res.nombre);
			$('#PAISE').val(res.pais);

			$("#modalEditar").modal("show");
		},
		error: (err) => {
			console.log(err);
		}
	});
});

$("#btnEditar").click(() => {
	var id = $("#IDE").val();
	var nombre = $("#NOMBREE").val();
	var pais = $("#PAISE").val();

	if(id == '') {
		alert("FALTA ID");
	} else if(nombre == '') {
		alert("FALTA NOMBRE");
	} else if(pais == '') {
		alert("FALTA PAIS");
	} else {
		var json = {"id": id, "nombre": nombre, "pais": pais};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/MARCAAPI/editar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalEditar").modal("hide");
				clear();
				$('.alert-warning').html('Se edito la MARCA con el NOMBRE ' + nombre).fadeIn().delay(4000).fadeOut('snow');
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
		url: "http:localhost:7500/MARCAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");
			
			var info = "";
			info +=	'<div class="box-body">' +
              '<dl class="dl-horizontal">' +
                '<dt>ID de la MARCA:</dt>' +
                '<dd id="IDEL">' + id + '</dd>' +
                '<dt>NOMBRE de la MARCA:</dt>' +
                '<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                '<dt>PAIS de la MARCA:</dd>' +
                '<dd id="PAISEL">' + res.pais + '</dt>' +
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
	var nombre = $("#NOMBREEL").html();

	console.log(nombre);
	var json = {"id" : id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/MARCAAPI/eliminar",
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

$("#tabla").on("click", ".btn-success", function() {
	var id = $(this).attr('data');

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/MARCAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalContar").modal("show");
			
			var info = "";
			info +=	'<div class="box-body">' +
              '<dl class="dl-horizontal">' +
                '<dt>ID de la MARCA:</dt>' +
                '<dd id="IDEL">' + id + '</dd>' +
                '<dt>NOMBRE de la MARCA:</dt>' +
                '<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                '<dt>PAIS de la MARCA:</dd>' +
                '<dd id="PAISEL">' + res.pais + '</dt>' +
              '</dl>' +
            '</div>'

            $.ajax({
							type: "AJAX",
							method: "GET",
							url: "http:localhost:7500/COMPUTADORAAPI/listar",
							contentType: "application/json; charset=UTF-8",
							success: (res2) => {
								info += 	'<div class="box-body">' +
              							'<dl class="dl-horizontal">';
								for(var i = 0; i < res2.length; i++) {
									if (res2[i].marca.id == id) {
										info += 	
                								'<dt>COMPUTADORA:</dt>' +
                								'<dd>' + res2[i].id + " " + res2[i].modelo + " $" + res2[i].precio + " " + res2[i].ram + 'GB</dd>';
                								
									}
								}

								info += 		'</dl>' +
            							'</div>';
            		let total = res2.filter(item => item.marca.id == id);
            		
            		info += 	'<div class="box-body">' +
              							'<dl class="dl-horizontal">' +
                							'<dt>En total son:</dt>' +
                							'<dd>' + total.length + '</dd>' +
              							'</dl>' +
            							'</div>'
								$("#listar").html(info);
							},
							error: (err) => {
								console.log(err);
							}
						});
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});

$("#btnContar").click(() => {
	$("#modalContar").modal("hide");
});

const clear = () => {
	$("#IDG").val("");
	$("#NOMBREG").val("");
	$("#PAISG").val("");
}