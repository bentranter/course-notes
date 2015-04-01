package speedstudy.speedstudy;

/**
 * Stores an error code, used in Updater and Login when communicating with the server.
 */
public class Error {
    int error;
    public Error()
    {
        error = 0;
    }

    /**
     * Set the error code
     * @param n - error code
     */
    public void set(int n){
        error = n;
    }

    /**
     * Retrieve the error code
     * @return int - error code
     */
    public int get(){
        return error;
    }
}
