const SUPABASE_URL = "YOUR_ACTUAL_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_ACTUAL_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registrationForm");

    if (!form) {
        console.error("Registration form not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const registration = {
            full_name: document.getElementById("name").value.trim(),
            age: parseInt(document.getElementById("age").value, 10),
            phone_number: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            course: document.getElementById("course").value,
            preferred_start_date: document.getElementById("date").value || null,
            address: document.getElementById("location").value.trim()
        };

        const button = form.querySelector('button[type="submit"]');

        button.disabled = true;
        button.textContent = "Submitting...";

        try {

            const { error } = await supabaseClient
                .from("registrations")
                .insert([registration]);

            if (error) {
                console.error("Supabase error:", error);
                alert("Registration failed. Please try again.");
                button.disabled = false;
                button.textContent = "Submit Registration";
                return;
            }

            window.location.href = "success.html";

        } catch (error) {

            console.error("Unexpected error:", error);
            alert("Something went wrong. Please try again.");

            button.disabled = false;
            button.textContent = "Submit Registration";
        }

    });

});
