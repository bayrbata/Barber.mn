from django.http.response import JsonResponse
from datetime import datetime
import pytz, json
from django.views.decorators.csrf import csrf_exempt
from barbermn.settings import sendResponse, connectDB, disconnectDB
import os
from django.conf import settings

def dt_time(request): #{key : value, key1 : value1, key2 : value2, }
    jsons = json.loads(request.body)
    action = jsons['action']
    respData = [{"tsag":str(datetime.now())}] # response-n data-g beldej baina. data key ni list baih buguud list dotor dictionary baina.
    resp = sendResponse(action, 200, "Success", respData)
    return (resp) # response bustsaaj baina

def dt_hello(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    respData = [{"result":"Hello world"}]
    resp = sendResponse(action, 200, "Success",respData)
    return resp

def dt_class(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    respData = [{"result":"ISSW"}]
    resp = sendResponse(action, 200, "Success", respData)
    return resp

def dt_getallbarber(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    # try:
    #     id = jsons['id']
    # except: 
    #     action = action
    #     respData = []
    #     resp = sendResponse(action, 1001, "id key baihgui",respData)
    #     return resp
    # {"action":"getallbarber"}
    try:
        myConn = connectDB() # database connection
        cursor = myConn.cursor() # create cursor
        query = f"""SELECT barbershopid, description, image, descriptionimage, location, rate, "time"
	                FROM t_barbershop;"""
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        # print(respRow)
        resp = sendResponse(action, 200, "Success", respRow)
    except Exception as e:
        action = action
        respData = []
        resp = sendResponse(action, 1006, "getdata database error " + str(e), respData)
    finally:
        cursor.close()
        disconnectDB(myConn)
    
    return resp
# dt_getdata

#dt_getbarberbyid
def dt_getbarberbyid(request):
    jsons = json.loads(request.body)
    action = jsons.get('action')

    try:
        barbershopid = jsons['barbershopid']
    except KeyError:
        return sendResponse(action, 400, "id талбар дутуу байна", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = f"""SELECT barbershopid, description, image, descriptionimage, location, rate, "time"
	                FROM t_barbershop
                    WHERE barbershopid = %s;"""
        cursor.execute(query, (barbershopid,))
        row = cursor.fetchone()

        if row:
            columns = [desc[0] for desc in cursor.description]
            barber_data = dict(zip(columns, row))
            return sendResponse(action, 200, "Салон мэдээлэл", barber_data)
        else:
            return sendResponse(action, 404, "Салон олдсонгүй", [])

    except Exception as e:
        return sendResponse(action, 500, str(e), [])

    finally:
        disconnectDB(myConn)
#dt_getbarberbyid

#dt_getuilchilgeebyid
def dt_getuilchilgeebyid(request):
    jsons = json.loads(request.body)
    action = jsons.get('action')

    #{
    #"action":"getuilchilgeebyid",
    #"uilchilgeecategoryid":1
    #}

    try:
        uilchilgeecategoryid = jsons['uilchilgeecategoryid']
    except KeyError:
        return sendResponse(action, 400, "id талбар дутуу байна", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """SELECT uilchilgeeid, uilchilgeename, uilchilgeedescription,une, hugatsaa
                   FROM t_barberuilchilgee bu
                   INNER JOIN t_barberuilchilgee_cat bc ON bu.uilchilgeecategoryid = bc.uilchilgeecategoryid
                   WHERE bc.uilchilgeecategoryid = %s;"""
        cursor.execute(query, (uilchilgeecategoryid,))
        rows = cursor.fetchall()

        if rows:
            columns = [desc[0] for desc in cursor.description]
            barber_data = [dict(zip(columns, row)) for row in rows]
            return sendResponse(action, 200, "Салон мэдээлэл", barber_data)
        else:
            return sendResponse(action, 404, "Салон олдсонгүй", [])

    except Exception as e:
        return sendResponse(action, 500, str(e), [])

    finally:
        disconnectDB(myConn)
#dt_getuilchilgeebyid

#dt_getuilchilgeecat
def dt_getuilchilgeecat(request):
    jsons = json.loads(request.body)
    action = jsons.get('action')

    # {
    # "action":"getuilchilgeecat",
    # "barbershop_id":1
    # }

    try:
        barbershop_id = jsons['barbershop_id']
    except KeyError:
        return sendResponse(action, 400, "id талбар дутуу байна", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """SELECT c.categoryname, c.uilchilgeecategoryid
                    FROM t_barbershop b
                    INNER JOIN t_barbercategory_shop h ON h.barbershopid = b.barbershopid
                    INNER JOIN t_barberuilchilgee_cat c ON c.uilchilgeecategoryid = h.catid
                    WHERE b.barbershopid = %s;"""
        cursor.execute(query, (barbershop_id,))
        rows = cursor.fetchall()

        if rows:
            columns = [desc[0] for desc in cursor.description]
            barber_data = [dict(zip(columns, row)) for row in rows]
            return sendResponse(action, 200, "Салон мэдээлэл", barber_data)
        else:
            return sendResponse(action, 404, "Салон олдсонгүй", [])

    except Exception as e:
        return sendResponse(action, 500, str(e), [])

    finally:
        disconnectDB(myConn)
#dt_getuilchilgeecat

#dt_getbarberbyid
def dt_getcatuilbyid(request):
    jsons = json.loads(request.body)
    action = jsons.get('action')

    try:
        barbershopid = jsons['barbershopid']
    except KeyError:
        return sendResponse(action, 400, "id талбар дутуу байна", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = f"""SELECT uilchilgeeid , uilchilgeename , uilchilgeedescription , image , une , hugatsaa,uridchilgaa_tolbor,tolbor,bu.uilchilgeecategoryid, categoryname FROM t_barberuilchilgee bu
                INNER JOIN t_barberuilchilgee_cat bc ON bu.uilchilgeecategoryid = bc.uilchilgeecategoryid
                WHERE bu.uilchilgeeid = %s"""
        cursor.execute(query, (barbershopid,))
        row = cursor.fetchone()

        if row:
            columns = [desc[0] for desc in cursor.description]
            barber_data = dict(zip(columns, row))
            return sendResponse(action, 200, "Салон мэдээлэл", barber_data)
        else:
            return sendResponse(action, 404, "Салон олдсонгүй", [])

    except Exception as e:
        return sendResponse(action, 500, str(e), [])

    finally:
        disconnectDB(myConn)
#dt_getbarberbyid

#dt_getalluilchilgee
def dt_getalluilchilgee(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    # try:
    #     id = jsons['id']
    # except: 
    #     action = action
    #     respData = []
    #     resp = sendResponse(action, 1001, "id key baihgui",respData)
    #     return resp
    
    try:
        myConn = connectDB() # database connection
        cursor = myConn.cursor() # create cursor
        query = f"""SELECT *
                FROM t_barberuilchilgee t
                INNER JOIN t_barberuilchilgee_cat c
                ON c.uilchilgeecategoryid=t.uilchilgeecategoryid"""
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        # print(respRow)
        resp = sendResponse(action, 200, "Success", respRow)
    except Exception as e:
        action = action
        respData = []
        resp = sendResponse(action, 1006, "getdata database error " + str(e), respData)
    finally:
        cursor.close()
        disconnectDB(myConn)
    
    return resp
#dt_getalluilchilgee

def dt_uploadimage(request):
    action = request.POST.get('action')
    # Step 2: Try to fetch the image file from request
    try:
        image_file = request.FILES.get('image')
    except: 
        action = action
        respData = []
        resp = sendResponse(action, 1001, "id key baihgui", respData)
        return resp
    
    try:
        myConn = connectDB() # database connection
        cursor = myConn.cursor() # create cursor
        
        # 3.1 Generate a safe filename with timestamp to avoid duplicates
        filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image_file.name}"

        # 3.2 Determine upload directory (e.g., "media/uploads/")
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        
        # 3.3 Save the file to disk
        file_path = os.path.join(upload_dir, filename)
        with open(file_path, 'wb+') as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)
                
        destinationFilename = "media/uploads/" + filename
        query = f"INSERT INTO t_draft(image) VALUES('{destinationFilename}') RETURNING did"
        cursor.execute(query)
        did = cursor.fetchone()[0]
        myConn.commit()
        
        query = f"SELECT * FROM t_draft WHERE did = {did}"
        print(query)
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        
        # print(respRow)
        resp = sendResponse(action, 200, "Success", respRow)
    except Exception as e:
        action = action
        respData = []
        resp = sendResponse(action, 1006, "getdata database error " + str(e), respData)
    finally:
        cursor.close()
        disconnectDB(myConn)
    
    return resp
#dt_dt_uploadimage

@csrf_exempt
def checkService(request):
    if request.method == "POST":
        content_type = request.content_type  
        if content_type == 'application/json': #raw json
            try:
                jsons = json.loads(request.body)
            except: 
                action = "invalid request json"
                respData = []
                resp = sendResponse(action, 404, "invalid json", respData)
                return (JsonResponse(resp))
            # print(jsons)
            
            try: 
                action = jsons['action']
            except:
                action = "no action"
                respData = []
                resp = sendResponse(action, 400, "no action key", respData)
                return (JsonResponse(resp))
            
            # print(action)
            if(action == 'time'):
                result = dt_time(request)
                return (JsonResponse(result))
            elif(action == 'hello'): #hello world
                result = dt_hello(request)
                return (JsonResponse(result))
            elif(action == 'class'): #
                result = dt_class(request)
                return (JsonResponse(result))
            elif(action == 'getallbarber'): #
                result = dt_getallbarber(request)
                return (JsonResponse(result))
            elif(action == 'getbarberbyid'): #
                result = dt_getbarberbyid(request)
                return (JsonResponse(result))
            elif(action == 'getalluilchilgee'): #
                result =dt_getalluilchilgee(request)
                return (JsonResponse(result))
            elif(action == 'getuilchilgeecat'): #
                result =dt_getuilchilgeecat(request)
                return (JsonResponse(result))
            elif(action == 'getuilchilgeebyid'): #
                result =dt_getuilchilgeebyid(request)
                return (JsonResponse(result))
            elif(action == 'getcatuilbyid'): #
                result =dt_getcatuilbyid(request)
                return (JsonResponse(result))
            
            
            # elif(action == 'getuser'):
            #     result = dt_getuser(request)
            #     return (JsonResponse(result))
            # elif(action == 'reguser'):
            #     result = dt_reguser(request)
            #     return (JsonResponse(result))
            # elif(action == 'loginuser'):
            #     result = dt_loginuser(request)
            #     return (JsonResponse(result))
        
            else:
                action = action
                respData = []
                resp = sendResponse(action, 406, "no registered action", respData)
                return (JsonResponse(resp))
            
        elif content_type.startswith('multipart/form-data'): # form-data
            try: 
                action = request.POST.get('action')
                print(action)
            except:
                action = "no action"
                respData = []
                resp = sendResponse(action, 4001, "no action key", respData)
                return (JsonResponse(resp))
            
            if(action == 'uploadimage'): #
                result = dt_uploadimage(request)
                return (JsonResponse(result))
            else:
                action = action
                respData = []
                resp = sendResponse(action, 406, "no registered action", respData)
                return (JsonResponse(resp))
            
    elif request.method == "GET":
        return (JsonResponse({"method":"GET"}))
    else :
        return (JsonResponse({"method":"busad"}))

# checkService