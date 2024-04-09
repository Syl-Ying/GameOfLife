import MainLayout from '../layout/MainLayout'
import './ContactPage.css';

function ContactPage() {
    return (
        <MainLayout>
            <div className="contact-container">
                <h1>Contact Information</h1>
                <p>Sylvia Ying</p>
                <p>GitHub Repo: <a href="https://github.com/Syl-Ying/Shujie-Ying-assignment2">Link</a></p>
            </div>
        </MainLayout>
    )
}

export default ContactPage