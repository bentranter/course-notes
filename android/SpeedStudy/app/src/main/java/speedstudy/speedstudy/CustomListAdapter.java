package speedstudy.speedstudy;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by Pita on 3/25/2015.
 */
public class CustomListAdapter extends ArrayAdapter<String> {

    public CustomListAdapter(Context context, int textViewResourceId) {
        super(context, textViewResourceId);
    }

    public CustomListAdapter(Context context, int resource, List<String> items) {
        super(context, resource, items);
    }

    public View getView(int position, View convertView, ViewGroup parent){
        View v = convertView;

        if (v == null) {

            LayoutInflater vi;
            vi = LayoutInflater.from(getContext());
            v = vi.inflate(R.layout.custom_list_row, null);

        }
        String dataText = getItem(position);
        TextView t = (TextView)v.findViewById(R.id.text1);
        t.setText(dataText);
        return v;
    }
}
