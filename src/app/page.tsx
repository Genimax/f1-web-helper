import { Header } from "@/widgets/Header/Header";
import { ChampionshipModule } from "@/widgets/ChampionshipModule/ChampionshipModule";
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <div className={styles.container}>
                    <ChampionshipModule />
                </div>
            </main>

            <Footer />
        </div>
    );
}
