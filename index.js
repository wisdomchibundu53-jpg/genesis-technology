const SUPABASE_URL = "https://mqgcfzhjapvypiwxcaj.supabase.co";
const SUPABASE_KEY = "sb_publishable_O5zOjcU5IFCLkNzcmBf1-g_jPxzpWrt";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const registration = {
        full_name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        phone_number: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        preferred_start_date: document.getElementById("date").value,
        address: document.getElementById("location").value
    };

    const { error } = await supabase
        .from("registrations")
        .insert([registration]);

    if (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
        return;
    }

    window.location.href = "success.html";
});
