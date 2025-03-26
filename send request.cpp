#include <iostream>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;
    
    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    
    if(curl) {
        // Your server endpoint (Change to your actual server IP or domain)
        const char* url = "http://YOUR_SERVER_IP:8000/post";
        
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        
        // Optional: Add headers if needed
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        
        // Execute the request
        res = curl_easy_perform(curl);
        
        if(res != CURLE_OK) {
            std::cerr << "POST request failed: " << curl_easy_strerror(res) << std::endl;
        } else {
            std::cout << "POST request sent successfully!" << std::endl;
        }
        
        // Cleanup
        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);
    }
    
    curl_global_cleanup();
    return 0;
}
