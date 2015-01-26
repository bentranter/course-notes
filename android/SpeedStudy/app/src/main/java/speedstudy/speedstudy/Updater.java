package speedstudy.speedstudy;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.EditText;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.RethinkDBConnection;
import com.rethinkdb.ast.query.RqlQuery;
import com.rethinkdb.model.RqlFunction;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

public class Updater extends AsyncTask<Void,Void,Integer> {
    Context context;
    public Updater(Context c){
        context = c;

    }

    @Override
    protected Integer doInBackground(Void... params) {
        RethinkDB r = RethinkDB.r;
        RethinkDBConnection con;
        try {
            con = r.connect("192.168.105.95", 28015);
        }
        catch (Exception e){
            return -1;
        }
        Object newStrings = r.table("table").pluck("file","timestamp").run(con);

        ArrayList<ArrayList<ArrayList<String>>> data = parseText(newStrings.toString());
        ArrayList<ArrayList<String>> files = new ArrayList<ArrayList<String>>();
        ArrayList<ArrayList<String>> notUpdateFiles = new ArrayList<ArrayList<String>>();
        BufferedReader reader;
        try{
            reader = new BufferedReader(new FileReader(context.getFilesDir()+"/fileList"));
            int i = 0;
            String line;
            while ( (line = reader.readLine()) != null){
                files.add(parseFileLine(line));
            }
            reader.close();
        }


        catch(Exception e){}
        String fileNameTemp = "";
        String timeTemp = "";
        System.out.println("Raw Data: "+newStrings.toString());
        System.out.println("size of data:"+data.size());
        //printMyList2(data);
        for (int i=0;i<data.size();i++){
            //System.out.println("i: "+i);
            for (int j=0;j<data.get(i).size();j++){

                if (data.get(i).get(j).get(0).equals("file")){
                    fileNameTemp = data.get(i).get(j).get(1);
                }
                if (data.get(i).get(j).get(0).equals("timestamp")){
                    timeTemp = data.get(i).get(j).get(1);
                }
            }
            modifyUpdateList(files, notUpdateFiles,fileNameTemp,timeTemp);

        }
        performUpdate(files,r,con);
        updateFilesList(files,notUpdateFiles);

        return new Integer(0);
    }
    public void printMyList(ArrayList<ArrayList<String>> strings){
        for (int i=0;i<strings.size();i++){
            //System.out.println("i: "+i);
            for (int j=0;j<strings.get(i).size();j++){
                //System.out.println("j: "+j);
                System.out.println("i: "+i+"  j: "+j+"  "+strings.get(i).get(j));
            }
        }
    }
    public void printMyList2(ArrayList<ArrayList<ArrayList<String>>> strings){
        for (int i=0;i<strings.size();i++){
            //System.out.println("i: "+i);
            for (int j=0;j<strings.get(i).size();j++){
                //System.out.println("j: "+j);
                for (int k=0;k<strings.get(i).get(j).size();k++){
                    System.out.println("i: "+i+"  j: "+j+"  k: "+k+"    "+strings.get(i).get(j).get(k));
                }

            }
        }
    }
    public void performUpdate(ArrayList<ArrayList<String>> files, RethinkDB r, RethinkDBConnection con){
        //printMyList(files);
        for (int i=0;i<files.size();i++) {

            final String tString = files.get(i).get(0);

            Object specificFile = r.table("table").filter(new RqlFunction() {
                @Override
                public RqlQuery apply(RqlQuery row) {
                    return row.field("file").eq(tString);
                }
            }).pluck("file", "timestamp", "data").run(con);

            ArrayList<ArrayList<ArrayList<String>>> parsedFile = parseText(specificFile.toString());
            String tempName = null;
            String tempTime = null;
            String tempData = null;
            if (parsedFile.size() > 0){
                for (int j=0;j<3;j++) {
                    if (parsedFile.get(0).get(j).get(0).equals("file")){
                        tempName = fixWriteText(parsedFile.get(0).get(j).get(1));
                    }
                    if (parsedFile.get(0).get(j).get(0).equals("timestamp")){
                        tempTime = fixWriteText(parsedFile.get(0).get(j).get(1));
                    }
                    if (parsedFile.get(0).get(j).get(0).equals("data")){
                        tempData = fixWriteText(parsedFile.get(0).get(j).get(1));
                    }
                }

            }

            if (tempName != null & tempData != null) {
                try
                {

                    String folder = context.getFilesDir().getPath()+"/";
                    while (tempName.contains("/")){
                        folder += tempName.substring(0,tempName.indexOf("/")+1);

                        tempName = tempName.substring(tempName.indexOf("/")+1);
                    }
                    File outputFolder = new File(folder);
                    outputFolder.mkdirs();
                    //System.out.println("Should print to: "+outputFolder.getPath() + "/" + tempName);
                    OutputStream fos = new BufferedOutputStream(new FileOutputStream(outputFolder.getPath()+"/"+tempName, false));


                    fos.write(tempData.getBytes());

                    fos.close();

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    public void updateFilesList(ArrayList<ArrayList<String>> list1, ArrayList<ArrayList<String>> list2){
        /*System.out.println("List 1 Size: "+list1.size());
        printMyList(list1);
        System.out.println("List 2 Size: "+list2.size());
        printMyList(list2);*/
        try {

            BufferedWriter fos = new BufferedWriter(new FileWriter(context.getFilesDir() + "/" + "fileList", false));
            String lineToAdd;
            for (int i=0;i<list1.size();i++){
                lineToAdd = "";
                lineToAdd += list1.get(i).get(0)+"'"+list1.get(i).get(1);
                fos.write(lineToAdd);
                fos.newLine();

            }
            for (int i=0;i<list2.size();i++){
                lineToAdd = "";
                lineToAdd += list2.get(i).get(0)+"'"+list2.get(i).get(1)+System.getProperty("line-separator");
                fos.write(lineToAdd);
                fos.newLine();


            }

            fos.close();
        } catch (Exception e) {

        }
    }
    public void modifyUpdateList(ArrayList<ArrayList<String>> list, ArrayList<ArrayList<String>> list2, String fileName, String timestamp){
        boolean found = false;

       // System.out.println("List 1 size before: "+list);
       // System.out.println("List 2 size before: "+list2);
       /* System.out.println("List 1 Size: "+list.size());
        printMyList(list);
        System.out.println("List 2 Size: "+list2.size());
        printMyList(list2);*/
        //System.out.println("File Name: "+fileName);
        for (int i=0;i<list.size();i++){
            if (list.get(i).get(0).equals(fileName)){
                found = true;
                if (list.get(i).get(1).equals(timestamp)){
                    list2.add((ArrayList<String>)list.get(i).clone());
                    list.remove(i);
                    break;
                }
                else{
                    break;
                }

            }
        }
        if (found == false){
            list.add(getArrayList(fileName, timestamp));
        }
      //  System.out.println("List 1 size after: "+list);
      //  System.out.println("List 2 size after: "+list2);
    }
    public ArrayList<String> getArrayList(String item1, String item2){
        ArrayList<String> list = new ArrayList<String>();
        list.add(item1);
        list.add(item2);
        return list;
    }
    public ArrayList<String> parseFileLine(String line){
        ArrayList<String> listOfLine = new ArrayList<String>();
        while (line.contains("'")){
            listOfLine.add(line.substring(0,line.indexOf("'")));
            line = line.substring(line.indexOf("'")+1);
        }
        listOfLine.add(line);
        return listOfLine;

    }
    public ArrayList<ArrayList<ArrayList<String>>> parseText(String readString){

        ArrayList<ArrayList<ArrayList<String>>> parsed = new ArrayList<ArrayList<ArrayList<String>>>();
        int index = 0;
        char temp;
        int depth = 0;
        int i = 0;
        int j = 0;
        int k = 0;
        while (index < readString.length()){
            temp = readString.charAt(index);
            if (temp == ' '){
                index++;
            }
            else  if (temp == '['){
                depth++;
                index++;
                continue;
            }
            else if (temp == '{'){
                depth++;
                index++;
                System.out.println("Adding new i");
                System.out.println("Rest: "+readString.substring(index));
                parsed.add(new ArrayList<ArrayList<String>>());
                parsed.get(i).add(new ArrayList<String>());
            }
            else if (temp == ']' | temp == '}'){
                depth--;
                index++;
                continue;
            }
            else if (temp == '='){
                k++;
                index++;
                continue;
            }
            else if (temp == ','){
                if (depth == 2){
                    parsed.get(i).add(new ArrayList<String>());
                    k=0;
                    j++;

                }
                if (depth == 1){
                    i++;
                    j=0;
                    //parsed.add(new ArrayList<ArrayList<String>>());

                }
                index++;
            }
            else{
                String tempString = readString.substring(index,readString.length());

                if (k == 0){

                    parsed.get(i).get(j).add(tempString.substring(0,tempString.indexOf("=")));
                    index+=parsed.get(i).get(j).get(0).length();
                    k++;

                }
                else{
                    int end = tempString.indexOf("}");
                    if (tempString.indexOf(",") < end && tempString.contains(",")){
                        end = tempString.indexOf(",");
                    }

                    parsed.get(i).get(j).add(tempString.substring(0,end));
                    index+=parsed.get(i).get(j).get(1).length();
                    k=0;
                }
            }
        }

        return parsed;
    }

    public static String fixWriteText(String text){
        String fixedText = "";
        int pos = 0;
        int offset = 0;
        /*


        */
        while (text.contains("'")){
            pos = text.indexOf("'");
            if (pos >= 0)
            {
                fixedText += text.substring(0,pos)+"^";
                text = text.substring(pos+1, text.length());
            }
        }
        fixedText += text;
        return fixedText;
    }
    public static String fixReadText(String text){
        String fixedText = "";
        int pos = 0;
        int offset = 0;
        /*


        */
        while (text.contains("^")){
            pos = text.indexOf("^");
            if (pos >= 0)
            {
                fixedText += text.substring(0,pos)+"'";
                text = text.substring(pos+1, text.length());
            }
        }
        fixedText += text;
        return fixedText;

    }
}
