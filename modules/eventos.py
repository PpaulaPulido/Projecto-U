from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session,jsonify
from werkzeug.utils import secure_filename
from datetime import datetime,timedelta
from db import get_db, get_cursor
import os

evento = Blueprint('evento', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
db = get_db()
cursor = get_cursor(db)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#********************************Resetear publicacion evento para registrar uno nuevo**************************************
@evento.route('/resetEvento')
def resetEvento():
    session.pop('evento_id', None)
    session.pop('form_data', None)
    return redirect(url_for('evento.publicarEventos'))


# Conexión para ingresar publicaciones de  eventos *******************************
@evento.route('/publicareventos', methods=['GET', 'POST'])
def publicarEventos():
    
    current_app.config['FOLDER_EVENT'] = os.path.join(current_app.root_path, 'static', 'galeriaEventos')
    codadmin = session.get('admin_id') 
    
    if request.method == 'GET' and request.args.get('nuevo', '0') == '1':
        # Si se especifica que es un nuevo evento, resetear la sesión
        session.pop('evento_id', None)
        session.pop('form_data', None)
        
    # Recuperar el ID del evento si existe en la sesión
    evento_id = session.get('evento_id')
    form_data = session.get('form_data', {})  # Almacena los datos del formulario en la sesión

    if request.method == 'POST':
        # Captura los datos del formulario y los almacena en la sesión
        galeria  = request.files.getlist('galeriaeven[]')
        
        logoeven = request.files.get("logoeven")
        if logoeven and allowed_file(logoeven.filename):
            filename = secure_filename(logoeven.filename)
            path = os.path.join(current_app.config['FOLDER_EVENT'], filename)
            logoeven.save(path)  # Guarda el archivo en el sistema de archivos
            relativePath =  os.path.join('galeriaEventos',filename)
            
        form_data.update({
            "nombreven": request.form.get("nombreven"),
            "tipoevento": request.form.get("tipoevento"),
            "contactoeven": request.form.get("contactoeven"),
            "correoeven": request.form.get("correoeven"),
            "fechaeven": request.form.get("fechaeven"),
            "horarioE": request.form.get("horarioE"),
            "horarioS": request.form.get("horarioS"),
            "descripcioneven": request.form.get("descripcioneven"),
            "paginaeven": request.form.get("paginaeven"),
            "boletoseven": request.form.get("boletoseven"),
            "redInstagram": request.form.get("redInstagram"),
            "redTiktok": request.form.get("redTiktok"),
            "descripcionA": request.form.get("descripcionA"),
        })
        session['form_data'] = form_data

        codadmin = session.get('admin_id')  # Código del administrador

        if not evento_id:
            cursor = db.cursor()
            fechaPublicacion = datetime.now().date()
            # Inserta un nuevo evento en la base de datos
            cursor.execute( "INSERT INTO eventos (nombreeven, logo, tipoevento, descripeven, paginaeven, boletaseven, infoAdicional, contacto, correoeven,fecha_publicacion, codadmin) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)",(form_data["nombreven"], relativePath, form_data["tipoevento"], form_data["descripcioneven"], form_data["paginaeven"], form_data["boletoseven"], form_data["descripcionA"], form_data["contactoeven"], form_data["correoeven"],fechaPublicacion ,codadmin))
            
            evento_id = cursor.lastrowid
            session['evento_id'] = evento_id
            
            # Inserta la galería de imágenes
            upload_folder = current_app.config['FOLDER_EVENT']
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            for imagen in galeria:
                if imagen and allowed_file(imagen.filename):
                    filename = secure_filename(imagen.filename)
                    path = os.path.join(upload_folder, filename)
                    imagen.save(path)
                    relative_path = os.path.join('galeriaEventos',filename)
                    cursor.execute("INSERT INTO galeriaeven (ideven, urlImagen, descripcion) VALUES (%s, %s, %s)", (evento_id, relative_path, "Imagen del evento"))
            
            # Insertar fechas y horarios
            cursor.execute("INSERT INTO fechaseven (ideven, fechaseven, horarioEntrada, horarioSalida) VALUES (%s, %s, %s, %s)", (evento_id, form_data["fechaeven"], form_data["horarioE"], form_data["horarioS"]))

            # Insertar redes sociales
            if form_data["redInstagram"]:
                #cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'instagram', form_data["redInstagram"]))
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (evento_id, 'evento', 'instagram', form_data["redInstagram"]))
            if form_data["redTiktok"]:
                #cursor.execute("INSERT INTO redesSocialesEven (ideven, red, url) VALUES (%s, %s, %s)", (evento_id, 'tik tok', form_data["redTiktok"]))
                cursor.execute("INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) VALUES (%s, %s, %s, %s)", 
                   (evento_id, 'evento', 'tiktok', form_data["redTiktok"]))

            db.commit()
            cursor.close()
        else:
            # Actualiza el evento existente
            cursor = db.cursor()
            cursor.execute(
                "UPDATE eventos SET nombreeven=%s, tipoevento=%s, descripeven=%s, paginaeven=%s, boletaseven=%s, infoAdicional=%s, contacto=%s, correoeven=%s WHERE ideven=%s",
                (form_data["nombreven"], form_data["tipoevento"], form_data["descripcioneven"], form_data["paginaeven"], form_data["boletoseven"], form_data["descripcionA"], form_data["contactoeven"], form_data["correoeven"], evento_id)
            )
            cursor.execute("UPDATE fechaseven SET fechaseven= %s, horarioEntrada = %s ,horarioSalida = %s WHERE ideven=%s",(form_data["fechaeven"],form_data["horarioE"], form_data["horarioS"],evento_id))
            
            if form_data["redInstagram"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redInstagram"], evento_id, 'evento', 'instagram'))
            if form_data["redTiktok"]:
                cursor.execute("UPDATE redes_sociales SET url = %s WHERE entidad_id = %s AND entidad_tipo = %s AND red = %s", 
                   (form_data["redTiktok"], evento_id, 'evento', 'tiktok'))
            db.commit()
            cursor.close()

        flash('Evento registrado correctamente', 'success')
        return redirect(url_for("evento.formularioUbicacion"))

    return render_template('formularioeventos.html', datos=form_data, evento_id=evento_id, admin_id =codadmin)

@evento.route('/FormularioEventosUbicacion',methods=['GET', 'POST'])
def formularioUbicacion():

    evento_id = session.get('evento_id')
    admin_id = session.get('admin_id')
    
    print("evento del id",evento_id)
    if request.method == 'POST':
        ubicaciones = request.form.getlist('direcciones[]')
        print("ubicacion de la variable ubicaciones ",ubicaciones)
        for ubicacion in ubicaciones:
            print("ubicacion dentro del for ",ubicacion)
            if ubicacion:  # Comprobar que la ubicación no este vacía
                cursor.execute("INSERT INTO ubicacioneven (ideven, ubicacion) VALUES (%s, %s)", (evento_id, ubicacion))
        db.commit()
        flash('Ubicaciones guardadas correctamente')
        return redirect(url_for('admin.index_admin'))
    return render_template('formularioEventos2.html',admin_id = admin_id)

#*******************************************************************************************Ruta para json de detalles de eventos***********************
@evento.route('/eventoDetalleJson/<int:id>',methods=['GET'])
def detalleEventoJson(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        if request.method == 'GET':
            sql = '''
                SELECT eve.ideven,
                    eve.nombreeven,
                    eve.logo AS logo_filename,
                    eve.tipoevento,
                    eve.descripeven,
                    eve.paginaeven,
                    eve.boletaseven,
                    eve.infoAdicional,
                    eve.contacto,
                    eve.correoeven,
                    eve.fecha_publicacion,
                    adm.nombreadmin as administrador,
                    adm.apellidoadmin AS apellidoAdm,
                    GROUP_CONCAT(DISTINCT fe.fechaseven SEPARATOR '; ') AS fechas_eventos,
                    GROUP_CONCAT(DISTINCT fe.horarioEntrada SEPARATOR '; ') AS hora_entrada,
                    GROUP_CONCAT(DISTINCT fe.horarioSalida SEPARATOR '; ') AS hora_salida,
                    GROUP_CONCAT(DISTINCT gr.urlImagen SEPARATOR '; ') AS imagenes_eventos,
                    GROUP_CONCAT(DISTINCT gr.descripcion SEPARATOR '; ') AS descripcion_imagenes,
                    GROUP_CONCAT(DISTINCT ub.ubicacion SEPARATOR '; ') AS ubicaciones_eventos,
                    GROUP_CONCAT(DISTINCT CONCAT(rs.red, ': ', rs.url) SEPARATOR '; ') AS redes_sociales
                FROM eventos eve 
                LEFT JOIN administrador adm ON eve.codadmin = adm.codadmin
                LEFT JOIN fechaseven fe ON eve.ideven = fe.ideven 
                LEFT JOIN galeriaeven gr ON eve.ideven = gr.ideven
                LEFT JOIN ubicacioneven ub ON eve.ideven = ub.ideven
                LEFT JOIN redes_sociales rs ON eve.ideven = rs.entidad_id AND rs.entidad_tipo = 'evento'
                WHERE eve.ideven = %s
                GROUP BY eve.ideven
                ORDER BY eve.fecha_publicacion DESC;
            '''
            cursor.execute(sql,(id,))
            evento = cursor.fetchone()
            
            if evento:
                if evento['logo_filename']:
                    normalized_logo_filename = evento['logo_filename'].replace('\\', '/')
                    logo_url = url_for('static', filename=normalized_logo_filename)
                else:
                    logo_url = url_for('static', filename='img/notFound.png')
                
                evento['logo'] = logo_url
                
                for key, value in evento.items():
                    if isinstance(value, timedelta):  
                      
                        evento[key] = str(value)
                    elif isinstance(value, str):  # Revisar si el valor es una cadena
                        # Corregir caracteres de escape en la cadena
                        evento[key] = value.replace('\\', '/')
                return jsonify(evento)
            
            else:
                return jsonify({'error': 'Evento no encontrado'}), 404       
    except Exception as e:
        return jsonify({'error': 'Error en el servidor: {}'.format(e)}), 500
    finally:
        cursor.close()
        db.close()

#**********************************Rutas estaticas********************************
@evento.route('/eventoDetalle')
def eventoDetalle():
    user_id = session.get('user_id')
    admin_id = session.get('admin_id')
    return render_template('detalle_event.html',user_id = user_id,admin_id = admin_id)

@evento.route('/detalleEvento/administrador')
def detalleEventoAdmin():
    admin_id = session.get('admin_id')
    return render_template('detalle_evento_admin.html',admin_id = admin_id)


@evento.route('/SeccionEvento')
def sectionEvento():
    user_id = session.get('user_id')
    admin_id = session.get('admin_id')
    return render_template('seccion_evento.html',user_id = user_id, admin_id = admin_id)

@evento.route('/SeccionEventoAdmin')
def sectionEventoAdmin():
    admin_id = session.get('admin_id')
    return render_template('seccion_evento_admin.html', admin_id = admin_id)

@evento.route('/eventoLocation')
def eventoLocation():
    return render_template('formularioEventos2.html')

@evento.route('/eventoDetalleServidor')
def eventoDetalleServidor():
    user_id = session.get('user_id')
    admin_id = session.get('admin_id')
    return render_template('detalleServidorEvento.html',user_id = user_id,admin_id = admin_id)

@evento.route('/eventoDetalleServidorAdmin')
def eventoDetalleServidorAdmin():
    admin_id = session.get('admin_id')
    return render_template('detalleServidorEventoAdmin.html',admin_id = admin_id)

